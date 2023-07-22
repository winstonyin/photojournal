import Markdown from "markdown-to-jsx"
import Photo from "../components/photo"

export default async function Posts() {
  return <Markdown
    options={{
      overrides: {
        Photo: {
          component: Photo,
        }
      }
    }}
  >
    {`
# header
1. item 1
2. item 2

<Photo src="/content/albums/Even More/For Mine (sharing)-31.jpg" url="/albums/Even More"} />
    `}
  </Markdown>
}