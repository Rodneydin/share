import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { feedQuery, searchQuery } from '../utils/data'

import { client } from '../client'
//import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
//import Spinner from './Spinner'


const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(false)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
  
    if(categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
       .then((data) => {
        setPins(data)
       })
    }
    else{
     // setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      })
    }
  }, [categoryId])
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <p>We are adding {ideaName} ideas to your feed</p> 
    );
  }
  

// if (loading) return <Spinner message='We are adding new ideas to your feed' />

 if (!pins?.length) return <h2>No Posts Available</h2>
  return (
    <div>
      {pins && (<MasonryLayout pins={pins}/>)}
    </div>
  )
}

export default Feed