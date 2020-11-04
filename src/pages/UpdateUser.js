import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { UPDATE_OPERATION , READ_OPERATION } from '../graphql/graphql'
import { Link } from 'gatsby';

export default (state) => {
    const userData  = state.location.state.e
    console.log("Update Data: " , userData)
    const [updateRecord] = useMutation(UPDATE_OPERATION )
    const [name, setName] = React.useState(userData.name)
    const [description, setDescription] = React.useState(userData.description)
    const [image, setImage] = React.useState(userData.image)
    const [isAvailable, setIsAvailable] = React.useState(userData.isAvailable)

    let updateData = (e) => {
        e.preventDefault()
        try{
            updateRecord({
                variables: {
                    id : userData.id,
                    name: name,
                    description: description,
                    image: image,
                    isAvailable: isAvailable
                },
                refetchQueries: [{ query: READ_OPERATION }]
            })
            alert('Record is added successfully')
        }
        catch (err) {
            alert('Something went wrong , try again')
        }
    
        // console.log('url : ', url, ' title ', title, ' description : ', description, 'image : ', image)
    }
    return (

        <Container>
            <Link to='/' className="btn btn-info" >Go Back</Link>
            <hr/>
            <h1> Update {userData.name} Record </h1>

            
            <Form onSubmit={(e) => updateData(e)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={userData.name} required onChange={(e) =>{setName(e.target.value)}} type="text" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control defaultValue={userData.description} required onChange={(e) =>{setDescription(e.target.value)}} as="textarea" rows={3} type="description" placeholder="Enter Short Description" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control defaultValue={userData.image} required onChange={(e) =>{setImage(e.target.value)}} type="text" placeholder="Enter Image Url" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Is User Available</Form.Label>
                    <Form.Check defaultChecked={userData.isAvailable ? true : false }   onChange={() => setIsAvailable(!isAvailable)} type="checkbox"  />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Record
                </Button>

            </Form>

        </Container>

    )
}