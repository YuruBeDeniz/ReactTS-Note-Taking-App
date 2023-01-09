import { Form, Stack, Row, Col, Button } from 'react-bootstrap'; 
import CreatableReactSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { NoteData, Tag } from '../App';

//this onSubmit function (our props here) will need to take in
//information related to our note; some type of data for our note:

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
};

export default function NoteForm({onSubmit}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
     <Stack gap={4}>
       <Row>
         <Col>
          <Form.Group controlId='title' >
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} required />
          </Form.Group>
         </Col>
         <Col>
          <Form.Group controlId='tags' >
            <Form.Label>Tags</Form.Label>
            <CreatableReactSelect 
              value={selectedTags.map(tag => {
                return { label: tag.label, value: tag.id } 
              })} 
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return { label: tag.label, id: tag.value }
                }))
              }}
              isMulti />
          </Form.Group>
         </Col>
       </Row> 
       <Form.Group controlId='markdown' >
         <Form.Label>Body</Form.Label>
         <Form.Control ref={markdownRef} required as='textarea' rows={15} />
       </Form.Group>
     </Stack>
     <Stack direction='horizontal' gap={2} className='justify-content-end' >
        <Button type='submit' variant='primary' >Save</Button>
        <Link to='..'>
        <Button type='button' variant='outline-secondary' >Cancel</Button>
        </Link>
     </Stack>
    </Form>
  )
}


//onChange -> to be able to modify our values. onChange is gonna be
//passed in an array of tags but these tags are gonna be in the format of
//the actual onChange which has a label and a value
