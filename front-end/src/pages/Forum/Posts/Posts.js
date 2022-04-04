import React, {useState} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const {posts} = useSelector((state) => state);
  const classes = useStyles();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = posts.filter((item) => {
            return Object.values(item.title).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(posts)
    }
}

  return (
    <div>
    <input icon='search' placeholder='What are you looking for?'
                onChange={(e) => searchItems(e.target.value)}
                style={{width: "100%",
                        padding: "10px",
                        border: "2px solid #111d5e",
                        borderRadius:"10px" }}
    />
    <>{
    !posts.length ? <CircularProgress /> : (
      <Grid  className={classes.container} container alignItems="stretch" spacing={3}>
        {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                                    <Grid style={{marginTop:'20px'}} key={item._id}  xs={12} sm={12} md={12}>
                                      <Post post={item} setCurrentId={setCurrentId} />
                                    </Grid>
                        )
        })
        ) : (
        
        posts.map((post) => (
          <Grid style={{marginTop:'10px'}} key={post._id} item xs={12} sm={12} md={12}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        )))}
      </Grid>
    )
    }</>
    </div>
  );
};

export default Posts;