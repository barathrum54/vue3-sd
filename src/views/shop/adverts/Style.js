import Styled from "vue3-styled-components";

export const Sidebar = Styled.div`
max-width: 480px;
margin: 0 auto;
.ant-card-body{
    padding: 20px 25px 25px !important
}
.ant-card-head-title{
    padding: 14px 0 !important;
    span{
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        font-size: 16px;
        font-weight: 500;
        color: ${({ theme }) => theme['dark-color']};
        svg{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
        }
    }
}
`;

export const SidebarSingle = Styled.div`
&:not(:last-child){
    margin-bottom: 32px;
}
h1{
    font-size: 15px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme['dark-color']};
}
.ant-slider{
    margin-bottom: 15px;
}
.price-range-text{
    font-weight: 500;
    margin-bottom: 0;
}
.atbd-category-list{
    li{
        &:not(:last-child){
            margin-bottom: 10px;
        }
        a{
            width: 100%
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            color: ${({ theme }) => theme['gray-color']};
            .category-count{
                font-size: 12px;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }
}
.btn-seeMore{
    font-size: 13px;
    font-weight: 500;
    display: inline-block;
    margin-top: 8px;
    color: ${({ theme }) => theme['primary-color']};
}
.ant-checkbox-group{
    .ant-checkbox-group-item{
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme['gray-color']};
        &:not(:last-child){
            margin-bottom: 10px;
        }
        &.ant-checkbox-wrapper{
            margin-right: 0;
        }
        >span + span{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 0;
            .brand-count{
                font-size: 12px;
                color: ${({ theme }) => theme['light-color']};
            }
            .rating-left{
                margin-top: -4px;
                min-width: 150px;
                @media only screen and (max-width: 1792px){
                    min-width: 130px;
                }
                .ant-rate{
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                    svg{
                        width: 13px !important;
                        height: 13px !important;
                    }
                }
            }
            .rating-right{
                text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                min-width: 60px;
                font-size: 12px;
                color: ${({ theme }) => theme['light-color']};
                @media only screen and (max-width: 1792px){
                    min-width: 26.5px;
                }
            }
        }
    }
}
.ant-checkbox-group{
    width: 100%;
}
`;

export const PaginationWrapper = Styled.div`
display: flex;
justify-content: space-between;
.is-processing {
    width: 12%;
    display: flex;
    justify-content: space-between;
    .ant-select.ant-select-single {
        width: 100%;
    }
}
.is-pagination {
    width: 30%;
    display: flex;
    justify-content: flex-end;
}

@media only screen and (max-width: 767px){
    margin-top: 0px !important
}
@media only screen and (max-width: 1199px){
    justify-content: center;
}
.ant-pagination{
    .ant-pagination-item-link,
    .ant-pagination-item,
    .ant-pagination-options .ant-select-selector{
        border: 1px solid ${({ theme }) => theme['border-color-light']} !important;
        color: ${({ theme }) => theme['gray-color']};
    }
    .ant-pagination-item a{
        color: ${({ theme }) => theme['gray-color']};
    }
}

`;

export const NotFoundWrapper = Styled.div`
text-align: center;
margin-top: 60px;
h1{
    border-bottom: 1px solid ${({ theme }) => theme['border-color-normal']};;
    border-top: 1px solid ${({ theme }) => theme['border-color-normal']};;
    padding: 15px 0 20px;
    color: ${({ theme }) => theme['dark-color']};
}
`;

export const ProductCard = Styled.div`
border-radius: 10px;
background-color: #fff;
position: relative;

@media only screen and (max-width: 767px){
    max-width: 350px;
    margin: 0 auto;
}
&.list-view{
    max-width: 100%;
    .product-single-price__offer{
        @media only screen and (max-width: 991px) and (min-width: 768px){
            display: block;
        }
    }
}
.product-list{
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    figure{
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        @media only screen and (max-width: 1199px){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        @media only screen and (max-width: 991px){
            margin: 0 0 20px;
        }
        img{
            border-radius: 10px;
        }
    }
    .product-single-description{
        p{
            color: ${({ theme }) => theme['gray-color']};
            font-size: 15px;
        }
    }
    .product-single-title{
        font-size: 18px;
        margin: 25px 0 16px;
        @media only screen and (max-width: 1199px){
            margin: 0 0 16px;
        }
    }
    .product-single-info{
        margin-top: 25px;
        @media only screen and (max-width: 1199px){
            margin-top: 0;
        }
    }
    .product-single-price__new{
        font-size: 16px;
    }
    .product-single-action{
        flex-flow: column;
        align-items: flex-start;
        margin: 28px 0 0 0;
        button{
            min-width: 132px;
            margin: 0;
            padding: 0px 14px;
            height: 38px;
        }
        .btn-cart{
            margin: 0 0 10px;
        }
        .ant-btn-sm{
            height: 38px;
        }
    }
    .btn-heart{
        @media only screen and (max-width: 1599px){
            top: 0;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 10px;
        }
        @media only screen and (max-width: 1199px){
            top: -4px;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
        }
        @media only screen and (max-width: 991){
            top: 0;
        }
    }
}
figure{
    margin-bottom: 0;
    img{
        width: 100%;
    }
}
figcaption{
    padding: 20px 20px 26px;
}
.btn-heart{
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 20px;
    top: 15px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 5px 10px ${({ theme }) => theme['light-color']}15;
}
.product-single-title{
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 500;
    a{
        color: ${({ theme }) => theme['dark-color']};
        &:hover{
            color: ${({ theme }) => theme['primary-color']};
        }
    }
}
.product-single-price{
    margin-bottom: 5px;
    del{
        margin: 0 5px;
    }
}
.product-single-price__new{
    font-weight: 600;
    color: ${({ theme }) => theme['primary-color']};
}
.product-single-price__offer{
    font-weight: 500;
    font-size: 12px;
    color: ${({ theme }) => theme['secondary-color']};
}
.product-single-rating{
    font-size: 12px;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .ant-rate{
        line-height: 1.2;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 5px;
    }
    .ant-rate-star:not(:last-child) {
        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 2px !important;
    }
    .ant-rate-star{
        div{
            transform: none !important;
        }
    }
    .total-reviews{
        font-weight: 400;
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
        color: ${({ theme }) => theme['light-color']};
    }
    svg{
        width: 13px;
    }
}
.product-single-action{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px -5px -5px -5px;
    button{
        font-size: 12px;
        margin: 5px;
    }
    .ant-btn-default{
        border-color: ${({ theme }) => theme['border-color-normal']};
        &:hover{
            border-color: ${({ theme }) => theme['primary-color']};
        }
    }
    .ant-btn-white{
        &:hover{
            border-color: ${({ theme }) => theme['primary-color']} !important;
        }
    }
    .ant-btn-sm{
        font-size: 12px;
        padding: 0px 18.065px;
        height: 36px;
    }
}
`;

export const AdvertSorting = Styled.div`
margin-bottom: 25px;
.project-sort-bar{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -10px;
    .project-sort-nav,
    .project-sort-search,
    .project-sort-group{
        padding: 0 10px;
    }

    .project-sort-group{
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: auto;
    }
    .project-sort-search{
        .ant-select-selection-search{
            width: 100% !important;
        }
    }
}
@media (max-width: 1500px){
    .project-sort-search{
        .ant-select{
            width: 237px !important;
        }
    }
    .project-sort-group .sort-group{
        .ant-select{
            min-width: 180px;
        }
    }
}
@media (min-width: 1201px) and (max-width: 1300px) {
    .project-sort-search{
        .ant-select{
            width: 170px !important;
        }
    }
    .project-sort-group{
        padding: 0 5px;

    }
    .project-sort-group .sort-group .layout-style a{
        width: 35px;
        height: 35px;
    }
    .project-sort-group .sort-group .ant-select {
        min-width: 170px;
        ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 5px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 5px;
    }
}
@media (max-width: 1199px){
    .project-sort-search{
        flex: 0 0 100%;
        order: 0;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
        .ant-select{
            width: 350px !important;
        }
    }
    .project-sort-nav{
        order: 1;
        margin: 0 auto;
    }
    .project-sort-group{
        order: 2;
    }
}
@media (max-width: 991px){
    .project-sort-group{
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: unset;
        flex: 0 0 100%;
        margin-top: 15px;
        .sort-group{
            justify-content: flex-start;
            .layout-style{
                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: auto;
            }
        }
    }
}
@media (max-width: 575px){
    .project-sort-group{
        .sort-group{
            > span{
                display: none;
            }
            .ant-select{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
            }
        }
    }
}

nav{
    background: #fff;
    border-radius: 5px;
    padding: 9px 20px;
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        li{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 11px;
            ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
theme['border-color-light']};
            &:last-child{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
                ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0 none;
            }
            a{
                color: ${({ theme }) => theme['gray-solid']};
                font-weight: 400;
                ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 11px;
            }
            &.active{
                a{
                    color: ${({ theme }) => theme['primary-color']};
                }
            }
            &:last-child{
                a{
                    ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 0;
                }
            }
        }
    }
}
.ant-select-selection-search-input{
    border: 0 none;
    border-radius: 23px;
    input{
        height: 40px !important;
        border-radius: 23px;
    }
}
.ant-select-arrow{
    right: auto;
    ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 11px !important;
}

.sort-group{
    color: ${({ theme }) => theme['gray-solid']};
    display: flex;
    align-items: center;
    justify-content: flex-end;


    .ant-select{
        ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 10px;
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        min-width: 260px;
        .ant-select-selector{
            border: 0 none;
            .ant-select-selection-item{
                color: ${({ theme }) => theme['gray-solid']};
            }

        }
    }
    .layout-style{
        display: flex;
        align-items: center;
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
        a{
            display: flex;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme['gray-solid']};
            &:hover,
            &.active{
                color: ${({ theme }) => theme['primary-color']};
                background: #fff;
                i{
                    svg{
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
            }
        }
    }
}
@media (max-width: 400px){
    .sort-group .ant-select{
        min-width: 200px;
    }
    .project-sort-search{
        .ant-select-auto-complete{
            width: 100% !important;
        }
    }
    .project-sort-nav{
        nav{
            padding: 10px;
        }
        nav ul{
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: -5px;
            li{
                ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0 none;
                margin-bottom: 5px;
            }
        }
    }
}
`;

export const TopToolBox = Styled.div`
margin-bottom: 20px;
/* // Toolbox Common Styles */
.ant-row{
    align-items: center;
}
.table-toolbox-menu{
    margin: -10px;
    color: ${({ theme }) => theme['gray-color']};
    @media only screen and (max-width: 1599px){
        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
    }
    @media only screen and (max-width: 991px){
        margin-top: 20px;
    }
    .ant-radio-button-wrapper{
        height: 40px;
        line-height: 40px;
        padding: 0 12.5px;
        &.active{
            span{
                color: ${({ theme }) => theme['primary-color']};
            }
        }
    }
    @media only screen and (max-width: 991px){
        text-align: center;
    }
    .toolbox-menu-title,
    .ant-radio-group-outline{
        margin: 10px;
    }
}
.ant-select{
    @media only screen and (max-width: 1599px){
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 767px){
        max-width: 350px;
        margin: 0 auto 20px;
    }
    .ant-select-selection-search{
        @media only screen and (max-width: 991px){
            width: 100% !important;
        }
        .ant-select-selection-search-input{
            min-width: 350px;
            @media only screen and (max-width: 1792px){
                min-width: 230px;
            }
        }
    }
}
.search-result{
    margin: ${({ theme }) => (theme.rtl ? '0 25px 0 0' : '0 0 0 25px')};
    color: ${({ theme }) => theme['gray-color']};
    @media only screen and (max-width: 1599px){
        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
        margin-bottom: 15px;
    }
    @media only screen and (max-width: 991px){
        text-align: center;
        margin-bottom: 18px;
    }
    @media only screen and (max-width: 991px){
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
    }
}
.ant-select-selector{
    height: 46px !important;
    .ant-select-selection-search-input{
        box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}3;
        border-radius: 23px;
        border: 0 none;
        input{
            height: 46px !important;
        }
    }
}

.ant-radio-group-outline{
    padding: 0 10px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid ${({ theme }) => theme['border-color-normal']};
    @media only screen and (max-width: 1792px){
        padding: 0 5px;
    }
    @media only screen and (max-width: 991px){
        padding: 0;
    }
}
.ant-radio-button-wrapper{
    height: 40px;
    line-height: 42px;
    padding: 0 12px;
    border-color: ${({ theme }) => theme['border-color-normal']};
    border: 0 none !important;
    @media only screen and (max-width: 1792px){
        padding: 0 7.5px;
    }
    @media only screen and (max-width: 1599px){
        padding: 0 12.5px;
    }
    &.ant-radio-button-wrapper-checked{
        box-shadow: none !important;
        outline: 0 !important;
        &:focus{
            box-shadow: none !important;
            outline: 0 !important;
        }
    }
    &:not(:first-child){
        &:before{
            display: none;
        }
    }
    &:not(:last-child){
        &:after{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0px;
            display: block;
            box-sizing: content-box;
            width: 1px;
            height: 50%;
            padding: 1px 0;
            background-color: #F1F2F6;
            transition: background-color 0.3s;
            content: '';
            z-index: 1;
            @media only screen and (max-width: 479px){
                display: none;
            }
        }
    }
    span{
        color: ${({ theme }) => theme['light-color']};
        @media only screen and (max-width: 1792px){
            font-size: 13px;
        }
    }
    &.ant-radio-button-wrapper-checked{
        span{
            color: ${({ theme }) => theme['primary-color']};
        }
    }
}

// Product Toolbox Styles
.product-list-action{
    @media only screen and (max-width: 991px){
        flex-flow: column;
        justify-content: center;
    }
}
.product-list-action__tab{
    margin: -10px;
    color: ${({ theme }) => theme['gray-color']};

    @media only screen and (max-width: 767px){
        margin-bottom: 15px;
        text-align: center;
    }
    @media only screen and (max-width: 991px) and (min-width: 768px){
        margin: -10px -10px 0;
    }
    @media only screen and (max-width: 575px){
        margin: -6px -6px 0;
    }
    @media only screen and (max-width: 344px){
        .ant-radio-group-outline{
            margin-top: 8px;
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0;;
        }
    }
    .toolbox-menu-title,
    .ant-radio-group{
        margin: 10px;
        @media only screen and (max-width: 575px){
            margin: 6px
        }
    }
}

.product-list-action__viewmode{
    display: flex;
    align-items: center;
    a{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: ${({ theme }) => theme['light-color']};
        box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}10;
        &.active{
            background-color: #fff;
            color: ${({ theme }) => theme['primary-color']};
        }
    }
    @media only screen and (max-width: 991px){
        display: none;
    }
}

.table-search-box{
    @media only screen and (max-width: 991px){
        max-width: 600px;
        margin: 0 auto;
    }
    .ant-select{
        margin-bottom: 0;
    }
    .ant-select-selection-search{
        width: 100% !important;
        .ant-select-selection-search-input {
            border-radius: 20px;
            border: 0 none;
            background: ${({ theme }) => theme['bg-color-light']};
            height: 40px;
            input{
                background: ${({ theme }) => theme['bg-color-light']};
                height: 40px !important;
            }
        }
    }
}
.table-toolbox-actions{
    text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media only screen and (max-width: 1599px){
        margin-top: 20px;
        justify-content: center !important;
        text-align: center !important;
    }
    button{
        padding: 0px 13.4px;
        height: 38px;
        font-size: 13px;
        font-weight: 500;
        border-radius: 6px;
        svg,
        i{
            color: #fff;
        }
        &{
            +button{
                ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
            }
        }
    }
}
`;

export const ProjectCard = Styled.div`
height: 90%;
.ant-card {
    height: 100%;
}
.ant-card-body{
    padding: 0px !important;
    position: relative;
}
.project-top{
    padding:30px 30px 0px;
}
.project-bottom{
    .project-assignees{
        padding: 16px 30px 25px;
    }
}

.is-advert-checkbox {
    position: absolute;
    top: 10px;
    left: 10px;
    width:35px;
    height:35px;
    span{
        width:20px;
        height:20px;
        }
}
.project-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    img {
        width: 100%;
        min-width: 100%;
    border-radius: 4px;
    object-fit: contain;
    height: 100%;
    background-color: ${({theme}) => theme.shops_lightThemeImageBackgroundColor};
    }

    h3 {
        font-size: 15px;
        display: -webkit-box;
        width: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;

        align-items: center;
        margin: -2px; 
        
    }

    p {
        font-size: 13px;
        color: ${({ theme }) => theme['gray-color']};
        &.is-content {
            display: -webkit-box;
            width: 100%;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .ant-dropdown-trigger{
        color: ${({ theme }) => theme['extra-light-color']};
    }
}
.project-timing{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    div{
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        span, strong{
            display: block;
        }
        span{
            font-size: 12px;
            margin-bottom: 2px;
            color: ${({ theme }) => theme['gray-solid']};
        }
        strong{
            font-weight: 500;
        }
    }
}
.project-assignees{
    margin-top: 17px;
    padding-top: 16px;
}
`;

export const AdvertTableStyleWrapper = Styled.div`
  padding: 25px;
  background: #fff;
  border-radius: 10px
  table{
    tbody{
      td{
        .user-info{
          .user-name{
            font-size: 14px;
          }
        }
        span.status-text{
          font-size: 12px;
          padding: 0 12.41px;
          line-height: 1.9;
          font-weight: 500;
          border-radius: 12px;
          text-transform: capitalize;
          display: inline-block !important;
          background: #ddd;
          &.active{
            background-color: ${({ theme }) => theme['success-color']}15;
            color: ${({ theme }) => theme['success-color']};
          }
          &.deactivate{
            background-color: ${({ theme }) => theme['warning-color']}15;
            color: ${({ theme }) => theme['warning-color']};
          }
          &.blocked{
            background-color: ${({ theme }) => theme['danger-color']}15;
            color: ${({ theme }) => theme['danger-color']};
          }
        }
      }
    }
    .table-actions{
     display: flex;
     justify-content: flex-end;
     span {
        margin-left: .5rem;
     }
    }
  }
  .ant-table-pagination.ant-pagination{
    width: 100%;
    text-align: ${({ theme }) => (!theme.rtl ? 'right' : 'left')};
    border-top: 1px solid ${({ theme }) => theme['border-color-light']};
    margin-top: 0 !important;
    padding-top: 30px;
    @media only screen and (max-width: 767px){
      text-align: center;
    }
  }
  .contact-table{
    table{
      tr{
        th{
          &:first-child{
            ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 20px;
          }
          &:last-child{
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 20px;
          }
        }
      }
      .table-actions{
        button{
         
          padding: 0;
          background-color: transparent;
          &:hover{
            background-color: transparent;
          }
          &.ant-btn-primary{
            &:hover{
              color: #ADB4D2;
            }
          }
        }
      }
      tbody >tr.ant-table-row-selected >td{
        background-color: ${({ theme }) => theme['primary-color']}10;
      }
    }
  }
`;

export const TableWrapper = Styled.div`
    .ant-pagination-prev, .ant-pagination-next {
        line-height: 28px !important;
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table table{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    .ant-table-thead > tr > th{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    span.anticon.anticon-right{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    span.anticon.anticon-left{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table-tbody > tr > td.ant-table-selection-column{
        text-align: left;
    }
    &.table-order,
    &.table-seller,
    &.table-data-view{
        .ant-table-selection{
            .ant-checkbox-indeterminate{
                .ant-checkbox-inner{
                    background: ${({ theme }) => theme['primary-color']};
                    border-color: ${({ theme }) => theme['primary-color']};
                    
                    &:after{
                        height: 2px;
                        background-color: #fff;
                    }
                  

                }
            }
        }
        .ant-table-container{
            padding-bottom: 25px;
            border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    .product-id{
                        max-width: 60px;
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                }
            }
        }
        .ant-pagination{
            margin-top: 25px !important;
        }
    }
    &.table-data-view{
        .ant-table-container{
            padding-bottom: 0;
        }
        table{
            thead{
                th{
                    padding: 15px 16px;
                }
            }
            tbody{
                td{
                    padding: 11px 16px;
                    .record-img{
                        img{
                            max-width: 38px;
                            min-height: 38px;
                            border-radius: 50%;
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        }
                    }
                    .record-location{
                        display: block;
                        font-size: 12px;
                        font-weight: 400;
                        color: ${({ theme }) => theme['light-color']};
                    }
                    .status{
                        font-weight: 500;
                        text-transform: capitalize;
                        &.active{
                            color: ${({ theme }) => theme['success-color']};
                            background: ${({ theme }) => theme['success-color']}10;
                        }
                        &.deactivated{
                            color: ${({ theme }) => theme['warning-color']};
                            background: ${({ theme }) => theme['warning-color']}10;
                        }
                        &.blocked{
                            color: ${({ theme }) => theme['danger-color']};
                            background: ${({ theme }) => theme['danger-color']}10;
                        }
                    }
                    .table-actions{
                        a{
                            svg, i{
                                width: 16px;
                                color: ${({ theme }) => theme['extra-light-color']};
                            }
                            &.edit{
                                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['info-color']};
                                }
                              }
                            }
                            &.delete{
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['danger-color']};
                                }
                              }
                            }
                        }
                    }
                }
            }
        }
    }
    table{
        thead{
            tr{
                border-radius: 10px;
                th{
                    &:last-child{
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                    color: ${({ theme }) => theme['gray-color']};
                    background: ${({ theme }) => theme['bg-color-light']};
                    border-top: 1px solid ${({ theme }) => theme['border-color-light']};
                    border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
                    &:first-child{
                        ${({ theme }) => (!theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                &.ant-table-row-selected{
                    &:hover{
                        td{
                            background: ${({ theme }) => theme['bg-color-light']};
                        }
                    }
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    border: 0 none;
                    font-weight: 500;
                    color: ${({ theme }) => theme['dark-color']};
                    &:first-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                    span{
                        display: block;
                    }
                    .order-id{
                        min-width: 128px;
                    }
                    .customer-name{
                        min-width: 174px;
                    }
                    .status.warning{
                        min-width: 131px;
                        display: inline-block !important;
                    }
                    .ordered-amount{
                        min-width: 175px;
                    }
                    .ordered-date{
                        min-width: 165px;
                    }
                    .table-actions{
                        min-width: 60px;
                    }
                }
            }
        }
        .table-actions{
            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
            min-width: 115px !important;
            button{
                height: 40px;
                padding: 0 11px;
                background: transparent;
                border: 0 none;
                color: ${({ theme }) => theme['extra-light-color']};
                &:hover{
                    &.ant-btn-primary{
                        color: ${({ theme }) => theme['primary-color']};
                        background: ${({ theme }) => theme['primary-color']}10;
                    }
                    &.ant-btn-info{
                        color: ${({ theme }) => theme['info-color']};
                        background: ${({ theme }) => theme['info-color']}10;
                    }
                    &.ant-btn-danger{
                        color: ${({ theme }) => theme['danger-color']};
                        background: ${({ theme }) => theme['danger-color']}10;
                    }
                }
            }
        }
        .seller-info{
            img{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
            }
        }
        .user-info{
            display: flex;
            align-items: center;
            figure{
                margin: 0 8px 0;
            }
            .user-name{
                margin-bottom: 4px;
                font-weight: 500;
            }
            .user-designation{
                font-size: 13px;
                font-weight: 400;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }
`;