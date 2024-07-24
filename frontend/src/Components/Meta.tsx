import {Helmet} from "react-helmet-async";
import {FC} from "react";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}

export const Meta:FC<MetaProps> = ({title='Welcome To ProShop',
                                       description = 'We sell the best products for cheap',
                                       keywords = 'electronics, buy electronics, cheap electronics'}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </Helmet>
    );
};

