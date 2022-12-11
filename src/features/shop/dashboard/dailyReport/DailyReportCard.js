import Styled from 'vue3-styled-components';

export const DailyReportCard = Styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 25px 25px 25px;
    overflow: hidden;
    position: relative;
    z-index: 0;
    font-weight:400 !important;
    height: 100%;

    @media only screen and (max-width: 991px){
        min-height: auto;
    }
    &:before{
        position: absolute;
        content: '';
        width: 100%;
        height: 215px;
        background:linear-gradient(45deg, ${({theme}) => theme['shops_dailyOverviewGradientPrimary']}, ${({theme}) =>
	theme['shops_dailyOverviewGradientSecondary']});
  ${({theme}) => (theme.rtl ? 'right' : 'left')}:0;
        top: 0;
        z-index:-1;
    }
    .overview-box{
        .ant-card-body{
            padding: 22px 25px 14px !important;
        }
        .ant-progress{
            margin-bottom: 15px;
        }
        .ant-progress-bg{
            height: 6px !important;
        }
        .overview-box-single{
            h1{
                margin-bottom: 0;
            }
            p{
                color: ${({theme}) => theme['light-color']};
            }
        }
        .growth-downward,
        .growth-upward{
            span{
                ${({theme}) => (theme.rtl ? 'margin-right' : 'margin-left')}: 6px;
            }
        }
        .overview-box-percentage{
            font-weight: 500;
        }
    }
    .ant-card{
        box-shadow: 0 10px 30px rgba(146,153,184,0.15);
        .growth-upward{
            color: ${({theme}) => theme['success-color']};
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            span{
                color: ${({theme}) => theme['light-gray-color']};
                font-weight: 400;
                font-size: 13px;
            }
        }
        .growth-downward{
            color: ${({theme}) => theme['danger-color']};
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            span{
                color: ${({theme}) => theme['light-gray-color']};
                font-weight: 400;
                font-size: 13px;
            }
        }
    }
    .overview-head{
        margin-bottom: 70px;
        h1{
            font-size: 16px;
            font-weight: 400;
            color: #fff;
        }
        .ant-btn-default{
            font-size: 12px;
            background: rgba(255,255,255,0.1);
            padding: 0px 11px;
            border: 0 none;
            color: #fff !important;
            svg,
            img,
            i{
                ${({theme}) => (theme.rtl ? 'margin-right' : 'margin-left')}: 6px;
            }
        }
        .ant-dropdown-trigger{
            height: 32px;
        }
    }
`;
