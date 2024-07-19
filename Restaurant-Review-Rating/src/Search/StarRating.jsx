import React from 'react'
import Rating from "react-rating"
const StarRating = () => {
  return (
    <div className='flex items-center'>
 
<Rating
  emptySymbol="fa fa-star-o fa-2x"
  fullSymbol="fa fa-star fa-2x"
  readonly
  initialRating={3}
/>
</div>
  )
}

export default StarRating