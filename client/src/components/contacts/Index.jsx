import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchContacts, addSearches, fetchSearches, removeSearch, removeSearch2, noSearchResult, noSearchResult2, removeCont, removeCont2} from '../Redux/contactSlice';

import Header2 from '../Header2';
import New from './New';
import './Contacts.css';
//import { toast } from 'react-toastify';

export default function Index(){

    const [showNew, setNew] = useState(false);
    const [query, setQuery] = useState('');
   
   let dispatch = useDispatch();
                                                                                                                                                        
     const contacts = useSelector(state=>state.contacts.contacts);
     const searches = useSelector(state=>state.contacts.searches);
     const removeIt = useSelector(state=>state.contacts.removeIt);
     const noSearchFound = useSelector(state=>state.contacts.noSearch);
      const removeAll =useSelector(state=>state.contacts.removeContacts)
     
     console.log(contacts, 'state')

        const handleNew = () =>{
             setNew(true);
        };


        useEffect(()=>{
             
            dispatch(fetchContacts());
            dispatch(fetchSearches());
        }, [dispatch]);
        
          const handleSearch = (e) =>{
              setQuery(e.target.value);
              let query = e.target.value;
                
              let searchData = contacts.filter(search=>search.name.toLowerCase().includes(query) || search.name.toUpperCase().includes(query.toUpperCase()));
              console.log(searchData)
              if(searchData.length > 0){
                  dispatch(addSearches(searchData))
                  let searchFound = 'Search Found';
                  console.log(searchFound);
                  dispatch(removeCont())
                  dispatch(removeCont2())


               }else{
              let searchNotFound= 'Search not found';
              console.log(searchNotFound);
              dispatch(removeSearch());
              dispatch(noSearchResult())
              dispatch(removeCont2())

              return false;
            }
              if(query === ''){
                dispatch(removeSearch());
                dispatch(noSearchResult2())
                dispatch(removeCont())


              }else{
                dispatch(removeSearch2());

              }
               }

           /*  const submitSearch = (e) =>{
                 e.preventDefault();

                
                    
                    let searchData = contacts.filter(search=>search.name.toLowerCase().includes(query) || search.name.toUpperCase().includes(query.toUpperCase()));
                    console.log(searchData)
                    if(searchData.length > 0){
                        dispatch(addSearches(searchData))
                       // setSearchResults(searchData)
                        let searchFound= 'Search Found';
                        console.log(searchFound);
                        toast.success(`Search result for ${query} found`)

                     }else{
                    let searchNotFound= 'Search not found';
                    console.log(searchNotFound);
                    toast.error(`Search result for ${query} not found`);
                  }
             } */

    return(
        <>
        <Header2 />
        <div className="container contacts-home">
            
           {/* <form className="mt-3 search-form" onSubmit={submitSearch} >
              <div className="input-group">
                <input type="search" className="form-control sm-search shadow-none" placeholder="Search..." value={query} onChange={handleSearch} />
                   
              </div>  
                </form>*/}
                 <div className="input-group search-form mt-3">
                <input type="search" className="form-control sm-search shadow-none" placeholder="Search..." value={query} onChange={handleSearch} />
                   
              </div> 

              {removeIt? 
              <div className="container ">
                    <h5 className="text-center text-white my-3 border-bottom">Search results for {query} found</h5>
                    {searches?.map(contact=>{
                        return(
                    <div className="text-center" key={contact._id}>
                        <Link className="" to={`/contact/${contact._id}`}><p>{contact.name}</p></Link>
                       
                    </div>
                        )
                    })}
                  </div>
                  :  ''
                 }

                 {noSearchFound? <h5 className="text-center text-white my-3 border-bottom">Search results for {query} not found</h5> : ''}
              
                <div className=" d-flex justify-content-end ">
                    <Link to="#" className=" plus text-white" onClick={handleNew}><h5 className="plus-one d-flex justify-content-center">+</h5></Link>
               
                </div>
                {removeAll?
                <div className="container ">
                    <h5 className="text-center text-white my-3 border-bottom">233 saved contacts available </h5>
                    {contacts.map(contact=>{
                        return(
                    <div className="text-center" key={contact._id}>
                        <Link className="" to={`/contact/${contact._id}`}><p>{contact.name}</p></Link>
                       
                    </div>
                        )
                    })}
                  </div>
                  : ''}
             
            <New showNew={showNew} setNew={setNew} />


        </div>

        </>
    )
}