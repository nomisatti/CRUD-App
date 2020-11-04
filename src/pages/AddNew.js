import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { ADD_OPERATION, READ_OPERATION } from '../graphql/graphql'
import { Link } from 'gatsby';

export default (location) => {
    const [addNewRecord] = useMutation(ADD_OPERATION)
    const [name, setName] = React.useState()
    const [description, setDescription] = React.useState()
    const [image, setImage] = React.useState()
    const [isAvailable, setIsAvailable] = React.useState(false)

    let addRecord = (e) => {
        e.preventDefault()
        try{
            addNewRecord({
                variables: {
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
            <h1> Add New User </h1>

            
            <Form onSubmit={(e) => addRecord(e)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required onChange={(e) =>{setName(e.target.value)}} type="text" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required onChange={(e) =>{setDescription(e.target.value)}} as="textarea" rows={3} type="description" placeholder="Enter Short Description" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control required onChange={(e) =>{setImage(e.target.value)}} type="text" placeholder="Enter Image Url" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Is User Available</Form.Label>
                    <Form.Check onChange={() => setIsAvailable(!isAvailable)} type="checkbox"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add New
                </Button>

            </Form>

        </Container>

    )
}