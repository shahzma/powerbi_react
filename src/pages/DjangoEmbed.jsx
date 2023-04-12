import React, { useEffect, useState , useRef} from 'react'

const DjangoEmbed = (props) => {
    const contentRef = useRef(null);
    const parser = new DOMParser();

    const load = async (url, selector) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`${url}: ${res.status} ${res.statusText}`);
        }
        const html = await res.text();
        const doc = parser.parseFromString(html, "text/html");
        return doc.querySelector(selector);
      };
      
    useEffect(() => {
        load('http://localhost:8001/index/', ".content")
          .then((content) => {
            // empty out any previous content
            contentRef.current.innerHTML = "";
            console.log('startuseffect')
            // console.log('address=', props.address)
            contentRef.current.append(content);
          })
          .catch(console.error);
      }, []);
      
  return (
    <div className="content" ref={contentRef}></div>
  )
}

export default DjangoEmbed