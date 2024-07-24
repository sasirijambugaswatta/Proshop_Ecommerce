import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FC} from "react";

interface Props {
    pages: number
    page: number
    isAdmin?: boolean
    keyword?: string
}

export const Paginate:FC<Props> = ({pages, page, isAdmin = false,keyword = ''}) => {

    return (
        (pages as number)  > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer key={x + 1} to={isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}`: `/admin/productlist/${x + 1}` : `/page/${x + 1}`}>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};