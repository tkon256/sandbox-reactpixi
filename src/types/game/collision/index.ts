import { combination, except } from '@/utils/array'

export class CollisionManager {
  private colliders: Collider[]
  private collisions: Collision[] = []
  private collisionEnterCallbacks: ((collision: Collision) => void)[] = []
  private collisionExitCallbacks: ((collision: Collision) => void)[] = []

  constructor(colliders?: Collider[]) {
    this.colliders = colliders ?? []
  }

  addCollider = <T extends Collider>(collider: T) => {
    console.log('addCollider', collider)

    const index = this.colliders.indexOf(collider)
    if (index !== -1) return this.colliders[index] as T
    this.colliders!.push(collider)
    return collider
  }

  addCircleCollider = (x: number, y: number, radius: number) => {
    return this.addCollider(new CircleCollider(this, x, y, radius))
  }

  addRectCollider = (x: number, y: number, width: number, height: number) => {
    return this.addCollider(new RectCollider(this, x, y, width, height))
  }

  removeCollider = (collider: Collider) => {
    console.log('removeCollider', collider)

    const index = this.colliders.indexOf(collider)
    if (index === -1) return
    this.colliders.splice(index, 1)
  }

  update = () => {
    const collisions = this.detectCollisions()

    const compareCollision = (c1: Collision, c2: Collision) => {
      return c1.collider === c2.collider && c1.target === c2.target
    }
    const enteredCollisions = except(
      collisions,
      this.collisions,
      compareCollision
    )
    const exitedCollisions = except(
      this.collisions,
      collisions,
      compareCollision
    )

    enteredCollisions.forEach(this.onCollisionEnter)
    exitedCollisions.forEach(this.onCollisionExit)

    this.collisions = collisions
  }

  private detectCollisions = () => {
    // Create all combinations of collision.
    return combination(this.colliders)
      .filter((c) => this.isCollided(c[0], c[1]))
      .flatMap((c) => [new Collision(c[0], c[1]), new Collision(c[1], c[0])])
  }

  registerCollisionEnter = (callback: (collision: Collision) => void) => {
    this.collisionEnterCallbacks.push(callback)

    const unregister = () => {
      const index = this.collisionEnterCallbacks.indexOf(callback)
      if (index === -1) return
      this.collisionEnterCallbacks.splice(index, 1)
    }

    return unregister
  }

  registerCollisionExit = (callback: (collision: Collision) => void) => {
    this.collisionExitCallbacks.push(callback)

    const unregister = () => {
      const index = this.collisionExitCallbacks.indexOf(callback)
      if (index === -1) return
      this.collisionExitCallbacks.splice(index, 1)
    }

    return unregister
  }

  private isCollided = (c1: Collider, c2: Collider) => {
    const isCollidedCircles = (c1: CircleCollider, c2: CircleCollider) => {
      const distancePow2 = Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2)
      const radiusPow2 = Math.pow(c1.radius + c2.radius, 2)
      return distancePow2 < radiusPow2
    }

    const isCollidedRects = (c1: RectCollider, c2: RectCollider) => {
      return !(
        c1.right <= c2.left ||
        c2.right <= c1.left ||
        c1.bottom <= c2.top ||
        c2.bottom <= c1.top
      )
    }

    const isCollidedCircleRect = (c1: CircleCollider, c2: RectCollider) => {
      const nearX = c1.x < c2.left ? c2.left : c2.right < c1.x ? c2.right : c1.x
      const nearY = c1.y < c2.top ? c2.top : c2.bottom < c1.y ? c2.bottom : c1.y

      const distancePow2 = Math.pow(nearX - c1.x, 2) + Math.pow(nearY - c1.y, 2)
      const radiusPow2 = Math.pow(c1.radius, 2)
      return distancePow2 < radiusPow2
    }

    if (c1 instanceof CircleCollider && c2 instanceof CircleCollider) {
      return isCollidedCircles(c1, c2)
    }
    if (c1 instanceof RectCollider && c2 instanceof RectCollider) {
      return isCollidedRects(c1, c2)
    }
    if (c1 instanceof CircleCollider && c2 instanceof RectCollider) {
      return isCollidedCircleRect(c1, c2)
    }
    if (c1 instanceof RectCollider && c2 instanceof CircleCollider) {
      return isCollidedCircleRect(c2, c1)
    }

    throw 'Unsupported collider type.'
  }

  private onCollisionEnter = (collision: Collision) => {
    console.log('onCollisionEnter', collision)
    this.collisionEnterCallbacks.forEach((c) => c(collision))
  }

  private onCollisionExit = (collision: Collision) => {
    console.log('onCollisionExit', collision)
    this.collisionExitCallbacks.forEach((c) => c(collision))
  }
}

export class Collision {
  constructor(
    public collider: Collider,
    public target: Collider
  ) {}
}

export abstract class Collider {
  constructor(
    public manager: CollisionManager,
    public x: number,
    public y: number,
    public tags?: string[]
  ) {}

  registerCollisionEnter = (callback: (collision: Collision) => void) => {
    return this.manager.registerCollisionEnter((c) => {
      if (c.collider !== this) return
      callback(c)
    })
  }

  registerCollisionExit = (callback: (collision: Collision) => void) => {
    return this.manager.registerCollisionExit((c) => {
      if (c.collider !== this) return
      callback(c)
    })
  }
}

export class CircleCollider extends Collider {
  constructor(
    manager: CollisionManager,
    x: number,
    y: number,
    public radius: number,
    tags?: string[]
  ) {
    super(manager, x, y, tags)
  }
}

export class RectCollider extends Collider {
  constructor(
    manager: CollisionManager,
    x: number,
    y: number,
    public width: number,
    public height: number,
    tags?: string[]
  ) {
    super(manager, x, y, tags)
  }

  get left() {
    return this.x
  }

  get top() {
    return this.y
  }

  get right() {
    return this.x + this.width
  }

  get bottom() {
    return this.y + this.height
  }

  get center() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
  }
}
