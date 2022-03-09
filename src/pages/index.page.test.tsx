import Home from "@/pages/index.page"
import { render } from "@testing-library/react"

test("render as expected", () => {
  render(<Home />)

  expect(document.body.innerHTML).toMatchSnapshot()
})
