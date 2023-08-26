import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props)=> {
const[articles,setArticles]=useState([])
const[loading,setLoading]=useState(true)
const[page,setPage]=useState(1)
const[totalResults,setTotalResults]=useState(0)


    const toUpper=(str)=>{
      return str
          .toLowerCase()
          .split(' ')
          .map(function(word) {
              console.log("First capital letter: "+word[0]);
              console.log("remain letters: "+ word.substr(1));
              return word[0].toUpperCase() + word.substr(1);
          })
          .join(' ');
       }
      
        

        const updateNews = async()=> {
        props.setProgress(10)
        let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b60bfaad46a2402fbb577725de805ff3&page=1&pageSize=${props.pageSize}`;
        setLoading(true)
        props.setProgress(30)
        let data =await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

     useEffect(()=>{
       document.title=`${toUpper(props.category)} - News Monkey`;
      updateNews();
       //  eslint-disable-next-line
     },[]);
    //  eslint-disable-next-line

    // Previous button funtion
    // handlePreviousClick=async ()=>{
    //     console.log("Previous button Pressed")
    //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=782d0bf13c1b4664aad39b1346b4f8d4&page=${state.page-1}&pageSize=${props.pageSize}`;
    //     setState({loading:true})
    //     let data =await fetch(url);
    //     let parsedData = await data.json();
    //     setState({
    //       page:state.page-1,
    //       articles:parsedData.articles,
    //       loading:false
    //     });
    // }

    // Next Button function
    // handleNextClick=async ()=>{
    //   console.log("Next button pressed")
    //   if(state.page+1 > Math.ceil(state.totalResults/props.pageSize)){

    //   }
    //   else{

    //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=782d0bf13c1b4664aad39b1346b4f8d4&page=${state.page+1}&pageSize=${props.pageSize}`;
    //     setState({loading:true})
    //       let data =await fetch(url);
    //       let parsedData = await data.json();
    //       console.log(parsedData);
    //       setState({
    //         page:state.page+1,
    //         articles:parsedData.articles,
    //         loading:false
    //   });
    // }}

        const fetchMoreData = async () => {
        let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b60bfaad46a2402fbb577725de805ff3&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page +1)
        let data =await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResult)
      };

    return (
      <>
        <h2 className="text-center" style={{marginTop:'90px'}}>NewsMonkey - Top Headlines from {toUpper(props.category)} category</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==  totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>


        {/*  To use the Previous and Next buttons
         <div className="d-flex justify-content-between">
        <button disabled={state.page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
        <button disabled={state.page+1 > Math.ceil(state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}

      </>
        
      )
    }


  News.defaultProps= {
      country:'in',
      pageSize:8,
      category:'general'
  }

  News.propTypes= {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }



export default News;
