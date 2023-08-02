import Markdown from "markdown-to-jsx"
import Gallery from "../components/gallery"

function cleanGallery(s : string) {
  // clean up the formatting inside <Gallery> by removing empty lines/spaces and making sure lines begin with /content/albums/
  return s
}

function countGallery(s : string) {
    // return number of photos in gallery
  let arr = s.match(/\/content\/albums\/.+/g)
  return arr?.length
}

export default function Posts() {
  let md = `
# 優勝美地國家公園

語支高十？麻胡定經跳「已的冰信雪動法化京身」找祖得以菜Some English拉示虎八珠百了，字蝶村干封聽洋您太村教。星干浪巴旁發給米以反大向生，至物清包行門品壯！手以怎抓們陽。

就瓜請個歌燈心、河手而字尤七麼姐、每手馬員視杯口朵甲五哥四姐明往，車雨校個發字走太蛋右八昌寫長跳虎幸吃：對麼冒第亭只奶小杯去訴山外意；冰貫女手因午晚風。

苦成圓晚放各蛋更苦，公乙反節息刀王葉實肖公方，錯升太足、學它大豆話因朱只雪鴨收；兔昌小布止奶九木哥躲不。

<Gallery>
/content/albums/Even More/For Mine (sharing)-31.jpg
/content/albums/Even More/For Mine (sharing)-32.jpg
/content/albums/Even More/For Mine (sharing)-33.jpg
/content/albums/Even More/For Mine (sharing)-34.jpg
/content/albums/Even More/For Mine (sharing)-35.jpg
/content/albums/Even More/For Mine (sharing)-36.jpg
/content/albums/Even More/For Mine (sharing)-37.jpg
/content/albums/Even More/For Mine (sharing)-38.jpg
</Gallery>

字車訴三才亭菜吉怪好馬山羊助清向記一：自二們者Yosemite National Park甲正百旦彩己有世門了；爪英鴨貫前我話月急弓；他坡幸耳香兩久用許連羊孝王頁母免目交學早卜。

白牛蝴洋苗大孝禾間安穴半食重：寸鼻助玉對、對各五左壯行合，行怪山刀肖第隻可！力成自急娘掃氣自六香交京員西豆。

<Gallery>
/content/albums/Even More/For Mine (sharing)-31.jpg
/content/albums/Even More/For Mine (sharing)-32.jpg
/content/albums/Even More/For Mine (sharing)-33.jpg
/content/albums/Even More/For Mine (sharing)-34.jpg
/content/albums/Even More/For Mine (sharing)-35.jpg
/content/albums/Even More/For Mine (sharing)-36.jpg
/content/albums/Even More/For Mine (sharing)-37.jpg
/content/albums/Even More/For Mine (sharing)-38.jpg
</Gallery>

中第虎麼友言原跳過。古具牠天叫品，大升用那冰五唱包戶世我時牛馬戶成「星戊雞」風九做兌裏虎人很夕，孝六福吧旁害百。

女用吧第，記雪刀什息圓安活古八田冒誰主左力來娘西。路愛爬眼怎每紅原苦；京冰夏去抓師消很支婆喜看。習字邊孝完穿外林因。口進耳青忍足走我才春男巴巾重；成未放功視竹。

<Gallery>
/content/albums/Even More/For Mine (sharing)-31.jpg
/content/albums/Even More/For Mine (sharing)-32.jpg
/content/albums/Even More/For Mine (sharing)-33.jpg
/content/albums/Even More/For Mine (sharing)-34.jpg
/content/albums/Even More/For Mine (sharing)-35.jpg
/content/albums/Even More/For Mine (sharing)-36.jpg
/content/albums/Even More/For Mine (sharing)-37.jpg
/content/albums/Even More/For Mine (sharing)-38.jpg
</Gallery>
`
  let start_key = 0
/*
First clean up the formating inside <Gallery> by removing empty lines/spaces and making sure all lines begin with /content/albums/
Count how many items are in each <Gallery>, add start_key="..." to each <Gallery>, and then increment start_key for the next tag
*/
  md = md.replace(/<Gallery>(.+?)<\/Gallery>/gs, (m, p1) => {
    let ret = "<Gallery start_key=\"" + start_key + "\">" + p1 + "</Gallery>"
    let n = p1.match(/\/content\/albums\/.+/g)?.length
    start_key += n
    console.log(ret)
    return ret
  })

  return <Markdown
    options={{
      overrides: {
        Gallery: {
          component: Gallery
        },
        h1: {
          component: "h1",
          props: {
            className: "text-6xl text-center mb-16"
          }
        },
        p: {
          component: "p",
          props: {
            className: "mb-4"
          }
        }
      }
    }}
    className="m-auto p-3 w-[808px] text-xl font-thin"
  >
    {md}
  </Markdown>
}