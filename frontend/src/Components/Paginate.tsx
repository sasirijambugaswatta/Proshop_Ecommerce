import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export const Paginate = ({pages, page, isAdmin = false}) => {

    return (
        (pages as number)  > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer key={x + 1} to={isAdmin ? `/admin/productlist/${x + 1}` : `/page/${x + 1}`}>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};