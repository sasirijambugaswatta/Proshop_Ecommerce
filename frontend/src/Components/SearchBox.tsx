import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import {Button, Form, FormControl} from "react-bootstrap";

export const SearchBox = () => {
    const navigate = useNavigate();
    const {keyword: urlKeyword} = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    async function submitHandler(e:FormEvent) {
        e.preventDefault();
        if(keyword.trim()){
            setKeyword('');
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
        }
    }

    return (
        <>
            <Form className={'d-flex'} onSubmit={submitHandler}>
                <FormControl type={'text'}
                             name={'q'}
                             onChange={(e) => setKeyword(e.target.value)}
                             value={keyword}
                             placeholder={'Search Products...'}
                             className={'mr-sm-2 ml-sm-5'}
                             ></FormControl>

                <Button type={'submit'} variant={'outline-light'} className={'p-2'}>
                    Search
                </Button>
            </Form>
        </>
    );
};