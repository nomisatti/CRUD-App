import gql from 'graphql-tag'


export const READ_OPERATION = gql`{
  read {
    id
    name 
    description 
    image 
    isAvailable
  }
}` ;

export const ADD_OPERATION = gql `
  mutation addCrud($name : String!, $description : String!, $image : String!, $isAvailable : Boolean!){
    addCrud (name : $name , description : $description , image : $image ,  isAvailable : $isAvailable){
      name
    }
  }

`

export const REMOVE_OPERATION = gql`
  mutation removeCrud ($id :ID!) {
    removeCrud (id : $id) {
      id
    }
  }

`

export const UPDATE_OPERATION = gql`
mutation updateCrud($id:ID! ,$name : String!, $description : String!, $image : String!, $isAvailable : Boolean!){
  updateCrud (id:$id ,name : $name , description : $description , image : $image ,  isAvailable : $isAvailable){
    name
  }
}

`;
