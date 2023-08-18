import ImageSwapper from "./components/image-swapper"
import albums from "@/data/albums.json"
import LargePhoto from "./components/large-photo";

function shuffle(array: string[]) {
  let currentIndex = array.length, randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function Main() {
  let n_col = 3
  let albums_arr = albums.filter(a => a.kind == 0)
  let images = shuffle(albums_arr.map(a => a.images ? a.images.map(i => i.src) : []).flat())
  let max = Math.min(60, Math.floor(images.length / (n_col*2)))

  return (
    <div className="h-full p-3 flex flex-col justify-evenly">
      <div className="flex justify-evenly">
        {Array.from(Array(n_col).keys()).map(i =>
          <ImageSwapper key={i} srcs={images.slice(max*i, max*(i+1))} />
        )}
      </div>
      <div className="flex justify-evenly">
        {Array.from(Array(n_col).keys()).map(i =>
          <ImageSwapper key={i} srcs={images.slice(max*(i+n_col), max*(i+1+n_col))} />
        )}
      </div>
    </div>
  )
}
