import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Paginate({pages, page, keyword='', isAdmin = false}) {
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0];
    }
  return ( pages > 1 && (
    <Pagination>
        {[...Array(pages).keys()].map((x) => (
           
                <Pagination.Item active={x+1 === page}> <Link
                key={x + 1}
                to={`/?keyword=${keyword}&page=${ x+ 1}`}  
                >{x+1} </Link></Pagination.Item>
           
        ))}
    </Pagination>
  
    ))
}

export default Paginate