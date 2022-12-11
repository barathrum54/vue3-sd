import Styled from 'vue3-styled-components';

export const KnowledgebaseTopWrap = Styled.div`
    .sDash_knowledgetop{
        text-align: center;
        padding: 65px;
        background-color: ${({ theme }) => theme['bg-color-light']};
        box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}10;
        @media only screen and (max-width: 575px){
            padding: 30px;
        }
        .sDash_knowledgetop__title{
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 25px;
            color: ${({ theme }) => theme['dark-color']};
            @media only screen and (max-width: 575px){
                font-size: 24px;
            }
        }
        .sDash_knowledgetop__formInner{
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 690px;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 0 10px 10px ${({ theme }) => theme['light-color']}10;
            @media only screen and (max-width: 575px){
                flex-wrap: wrap;
                padding: 25px 15px;
            }
            .ant-form-item{
                margin-bottom: 0;
                @media only screen and (max-width: 575px){
                    width: 100%;
                }
            }
            .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
                height: 54px !important;
                border: 0 none;
            }
            .ant-select{
                min-width: 160px;
                .ant-select-arrow{
                    ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 30px;
                    @media only screen and (max-width: 575px){
                        top: 40%;
                    }
                }
            }
            .ant-select-selector{
                @media only screen and (max-width: 575px){
                    width: calc(100% - 22px);
                    position: relative;
                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 11px;
                    border-radius: 4px;
                    border: 1px solid ${({ theme }) => theme['border-color-normal']} !important;
                    margin-bottom: 15px;
                }
                .ant-select-selection-search{

                    .ant-select-selection-search-input{
                        height: 54px;
                    }
                }
                .ant-select-selection-item{
                    font-size: 15px;
                    color: ${({ theme }) => theme['gray-color']};
                    text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')}
                    line-height: 54px !important;
                    ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
    theme['border-color-normal']};
                    @media only screen and (max-width: 575px){
                        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0px solid ${({ theme }) =>
    theme['border-color-normal']};
                    }
                }
            }
            .sDash_search-input{
                width: 100%;
                .ant-form-item-control{
                    @media only screen and (max-width: 575px){
                        padding: 0 11px;
                    }
                }
                .ant-form-item-control-input{
                    font-size: 15px;
                    color: #868EAE;
                    height: 54px;
                    @media only screen and (max-width: 575px){
                        border-radius: 4px;
                        border: 1px solid ${({ theme }) => theme['border-color-normal']};
                        margin-bottom: 15px;
                    }
                }
                .ant-input{
                    line-height: 2;
                    border: 0 none;
                    &:focus{
                        outline: none;
                        box-shadow: 0 0;
                    }
                }
            }
            .btn-search{
                font-size: 15px;
                height: 54px;
                border-radius: 0 4px 4px 0;
                border-radius: ${({ theme }) => (theme.rtl ? '4px 0 0 4px' : '0 4px 4px 0')}
                padding: 6.4px 27.7px;
                @media only screen and (max-width: 575px){
                    border-radius: 4px;
                }
            }
        }
    }
    .sDash_knowledgetop__popular--topics{
        margin-top: 22px;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin: -6px 0;
        }
        li{
            margin: 6px 0;
            @media only screen and (max-width: 379px){
                flex: 100%;
                width: 100%;
            }
            &:first-child{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 25px !important;
                @media only screen and (max-width: 379px){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px !important;
                }

            }
            &:not(:last-child){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
                @media only screen and (max-width: 379px){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
                }
            }
            a,
            span{
                font-size: 14px;
                color: ${({ theme }) => theme['gray-color']};
            }
            a{
                color: ${({ theme }) => theme['light-gray-color']};
                transition: .35s;
                &:hover{
                    color: ${({ theme }) => theme['dark-color']};
                    text-decoration: underline;
                }
            }
        }
    }
`;
