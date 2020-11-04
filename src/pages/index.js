import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/client'
import { READ_OPERATION , REMOVE_OPERATION } from '../graphql/graphql'
import { Table, Container, Spinner } from 'react-bootstrap';
import { Link, navigate } from "gatsby";
import './main.css'

export default function Home() {

  const { loading, error, data } = useQuery(READ_OPERATION);
  const [removeRecord] = useMutation(REMOVE_OPERATION)



  let updateData = (e) => {
    navigate("/UpdateUser" , {
      state : {e}
    })
  }
  let removeData = async(e) => {
    if (window.confirm("Are you sure ? You want to remove this User")) {
     
      removeRecord({
        variables: {
          id: e
        },
        refetchQueries: [{ query: READ_OPERATION }]
      })
      alert('User record is removed successfully !')
    }
  }
  if (loading) {
    return (
      <Spinner animation="grow" />
    )

  }

  if (error) {

    return (
      <div>error ...</div>
    )

  }
  return (
    <div>
      <Container >
         <h1 > Users Record</h1>
        <Link to='/AddNew' className='btn btn-info' >Add New</Link>
        <br /> <br />
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Actions </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Availability</th>

            </tr>
          </thead>
          <tbody>
            {data.read.map((d => (
              <tr key={d.id}>

                <td className='actions-buttons'>
                  <button onClick={(e) => removeData(d.id)} type="button" className="btn btn-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                  fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">
                      </line></svg>

                  </button>
                  <button onClick={() => updateData(d)} type="button" className="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34">
                    </path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>

                  </button>
                </td>
                <td><img className='user-image' src={d.image} alt={d.image} /></td>
                <td>{d.name}</td>
                <td className='descp'>{d.description}</td>
                <td className={d.isAvailable ? '' : 'notAvailable'} >{d.isAvailable ? '✔' : '✘'}</td>
              </tr>
            )))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
