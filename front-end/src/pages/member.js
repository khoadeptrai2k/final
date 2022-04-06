import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../redux/actions/usersAction'
import MemberItem from './Member/memberItem'
import { Grid, CircularProgress } from '@material-ui/core';

const Member = () => {

    const {auth, users} = useSelector(state => state)
    const dispatch = useDispatch()

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() =>{
      dispatch(fetchAllUsers(auth))
  },[dispatch, auth])
    
    const searchItems = (searchValue) => {
      setSearchInput(searchValue)
      if (searchInput !== '') {
          const filteredData = users.filter((item) => {
              return Object.values(item.name).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(users)
      }
    }


  return (
    <div> 
      <div style={{margin:'50px'}}> 
        MEMBER
        <input icon='search' placeholder='What are you looking for?'
                onChange={(e) => searchItems(e.target.value)}
                style={{width: "100%",
                        padding: "10px",
                        border: "2px solid #111d5e",
                        borderRadius:"10px" }}
        />
      </div>

    <>{
    !users.length ? <CircularProgress /> : (
      <div className='memberList'>
        {searchInput.length > 1 ? (
            filteredResults.map((item) => {
                        return (
                              <MemberItem key={item._id} member={item} />
                        )
        })
        ) : (
          
          users.map((member) => (
                  <MemberItem key={member._id} member={member} />
              
        )))}
      </div>
    )
    }</>
    </div>
  )
}

  

export default Member