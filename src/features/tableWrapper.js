import Styled from "vue3-styled-components";

export const TableWrapper = Styled.div`
    .ant-pagination-prev, .ant-pagination-next {
        line-height: 28px !important;
        transform: rotateY(${({theme}) => (theme.rtl ? '180deg' : '0deg')})
    }
    
    .ant-table table{
        text-align: ${({theme}) => (!theme.rtl ? 'left' : 'right')};
    }
    .ant-table-thead > tr > th{
        text-align: ${({theme}) => (!theme.rtl ? 'left' : 'right')};
    }
    span.anticon.anticon-right{
        transform: rotateY(${({theme}) => (theme.rtl ? '180deg' : '0deg')})
    }
    span.anticon.anticon-left{
        transform: rotateY(${({theme}) => (theme.rtl ? '180deg' : '0deg')})
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
                    background: ${({theme}) => theme['primary-color']};
                    border-color: ${({theme}) => theme['primary-color']};
                    &:after{
                        height: 2px;
                        background-color: #fff;
                    }
                }
            }
        }
        .ant-table-container{
            padding-bottom: 25px;
            border-bottom: 1px solid ${({theme}) => theme['border-color-light']};
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({theme}) => theme['bg-color-light']};
                    }
                }
                td{
                    .product-id{
                        max-width: 60px;
                        text-align: ${({theme}) => (theme.rtl ? 'left' : 'right')};
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
                            ${({theme}) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        }
                    }
                    .record-location{
                        display: block;
                        font-size: 12px;
                        font-weight: 400;
                        color: ${({theme}) => theme['light-color']};
                    }
                    .status{
                        font-weight: 500;
                        text-transform: capitalize;
                        &.active{
                            color: ${({theme}) => theme['success-color']};
                            background: ${({theme}) => theme['success-color']}10;
                        }
                        &.deactivated{
                            color: ${({theme}) => theme['warning-color']};
                            background: ${({theme}) => theme['warning-color']}10;
                        }
                        &.blocked{
                            color: ${({theme}) => theme['danger-color']};
                            background: ${({theme}) => theme['danger-color']}10;
                        }
                    }
                    .table-actions{
                        
                        a{
                            svg, i{
                                width: 16px;
                                color: ${({theme}) => theme['extra-light-color']};
                            }
                            &.edit{
                                ${({theme}) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
                              &:hover{
                                svg,
                                i{
                                    color: ${({theme}) => theme['info-color']};
                                }
                              }
                            }
                            &.delete{
                              &:hover{
                                svg,
                                i{
                                    color: ${({theme}) => theme['danger-color']};
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
                th{
                    &:last-child{
                        text-align: ${({theme}) => (theme.rtl ? 'left' : 'right')};
                        padding-right: 25px;
                    }
                    color: ${({theme}) => theme['gray-color']};
                    background-color: #fff;
                    border-radius: 0  !important;
                    border-top: 1px solid ${({theme}) => theme['border-color-light']};
                    border-bottom: 1px solid ${({theme}) => theme['border-color-light']};
                    &:first-child {
                    padding-left: 25px;
                    }
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({theme}) => theme['bg-color-light']};
                    }
                }
                &.ant-table-row-selected{
                    &:hover{
                        td{
                            background: ${({theme}) => theme['bg-color-light']};
                        }
                    }
                    td{
                        background: ${({theme}) => theme['bg-color-light']};
                    }
                }
                td{
                    border: 0 none;
                    font-weight: 500;
                    color: ${({theme}) => theme['dark-color']};
                    border-bottom: 1px solid #f0f0f0;
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
            text-align: ${({theme}) => (theme.rtl ? 'left' : 'right')};
            min-width: 115px !important;
            button{
                height: 40px;
                padding: 0 11px;
                background: transparent;
                border: 0 none;
                color: ${({theme}) => theme['extra-light-color']};
                &:hover{
                    &.ant-btn-primary{
                        color: ${({theme}) => theme['primary-color']};
                        background: ${({theme}) => theme['primary-color']}10;
                    }
                    &.ant-btn-info{
                        color: ${({theme}) => theme['info-color']};
                        background: ${({theme}) => theme['info-color']}10;
                    }
                    &.ant-btn-danger{
                        color: ${({theme}) => theme['danger-color']};
                        background: ${({theme}) => theme['danger-color']}10;
                    }
                }
            }
        }
        .seller-info{
            img{
                ${({theme}) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
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
                color: ${({theme}) => theme['light-color']};
            }
        }
    }
`;