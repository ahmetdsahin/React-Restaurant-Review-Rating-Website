import React from 'react'

const SearchInfo = (props) => {

    let resultStats = null ;


    if (props.amountResults && props.shownResults) {
      resultStats  =<p>&nbsp;için {props.amountResults} sonuç gösteriliyor </p>
    }
    return (
        <div className='flex flex-col items-center text-center  py-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='flex '>       
            <h1>" <strong className='text-red-600'>{props.term} ve {props.location} </strong> "</h1>
            {resultStats}
            </div>
        </div>
    );
}

export default SearchInfo