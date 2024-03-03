import { ButtonAnchor } from '../../components/anchor'

export const Home = () => {
  return (
    <>
      <div className="flex flex-wrap justify-around gap-4">
        <ButtonAnchor href="/samples/1">Sample 1</ButtonAnchor>
        <ButtonAnchor href="/samples/2">Sample 2</ButtonAnchor>
      </div>
    </>
  )
}
