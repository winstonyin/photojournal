'use client'

export default function NoScroll({noscroll}: {noscroll: boolean}) {
  if (noscroll && !document.body.classList.contains('overflow-hidden')) {
    document.body.classList.add('overflow-hidden')
  } else if (!noscroll && document.body.classList.contains('overflow-hidden')) {
    document.body.classList.remove('overflow-hidden')
  }
  return <></>
}