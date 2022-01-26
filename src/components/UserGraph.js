import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import * as d3 from 'd3'

export default function UserGraph(){
    // d3.selectAll("p").style("color", "blue")
    useEffect(() => {
      d3.select("body").append("p").text("display user connections (forced-layout graph) here!");
    }, [])
    
    var data = {
        nodes: [
          { id: 0 },
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
        ],
        links: [
          { source: 0, target: 1 },
          { source: 0, target: 2 },
          { source: 0, target: 3 },
          { source: 0, target: 4 },
          { source: 0, target: 5 },
          { source: 0, target: 6 },
          { source: 0, target: 7 },
          { source: 0, target: 8 },
          { source: 0, target: 9 },
          { source: 0, target: 10 },
        ],
      }
    
    // const force = d3.stack.force()
    //   .charge(-120)
    //   .linkDistance(50)
    //   .size([100, 200])
    //   .nodes(data.nodes)
    //   .links(data.links);

      
    return(
        <div>
           
            
        </div>
    )
}