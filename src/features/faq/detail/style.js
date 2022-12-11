import Styled from "vue3-styled-components";
export const FaqWrapper = Styled.div`
  .ant-card{
    .ant-card-body{
      h1{
        font-weight: 500;
      }
    }
  }
  .ant-collapse{
    margin-top: 25px;
    &.ant-collapse-borderless{
      background: #fff;
    }
    &.ant-collapse-icon-position-left{
      .ant-collapse-header{
        color: ${({ theme }) => theme['dark-color']} !important;
      }
    }
  }
  .ant-collapse-item{
    border: 1px solid ${({ theme }) => theme['border-color-light']} !important;
    margin-bottom: 5px;
    &.ant-collapse-item-active{
      box-shadow: 0px 15px 40px ${({ theme }) => theme['light-color']}15;
    }
    .ant-collapse-header{
      font-weight: 500;
      font-size: 15px;
      background-color: #fff;
      padding: 18px 25px !important;
      border-radius: 5px !important;
      @media only screen and (max-width: 575px){
        padding: ${({ theme }) => (!theme.rtl ? '15px 45px 15px 15px' : '15px 15px 15px 45px')} !important;
      }
      .ant-collapse-arrow{
        ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: auto !important;
        ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 25px !important;
        top: 22px !important;
        transform: translateY(0) !important;
      }
    }
  }

  .ant-collapse-content{
    background-color: #fff !important;
    box-shadow: 0 15px 40px ${({ theme }) => theme['light-color']}15;
    .ant-collapse-content-box{
      border-top: 1px solid ${({ theme }) => theme['border-color-light']} !important;
      padding: 20px 25px 30px !important;
      P{
        font-size: 15px;
        margin-bottom: 35px;
        line-height: 1.667;
        color: ${({ theme }) => theme['gray-color']};
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6{
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        color: ${({ theme }) => theme['dark-color']};
      }
      .panel-actions{
        display: flex;
        button{
          height: 36px;
          padding: 0 15px;
          &:not(:last-child){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
        }
      }
    }
  }
`;
export const Wrapper = Styled.div`
  background-color: ${({ theme }) => theme['bg-color-light']};
  border-radius: 10px;
  box-shadow: 0 5px 20px #9299B810;
  margin-bottom: 50px;
  .sDash-support-container{
    max-width: 1110px;
    margin: 0 auto;
    @media only screen and (max-width: 1599px){
      max-width: 990px;
    }
    @media only screen and (max-width: 1399px){
      max-width: 790px;
    }
    @media only screen and (max-width: 1150px){
      max-width: 100%;
      padding: 30px
    }
  }
  .sDash_support-content{
    .sDash_support-content__title{
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 10px;
      color: ${({ theme }) => theme['dark-color']};
      @media only screen and (max-width: 767px){
        font-size: 26px;
      }
    }
    p{
      color: ${({ theme }) => theme['gray-color']};
    }
    .btn-ticket{
      margin-top: 15px;
      height: 46px;
      font-size: 14px;
      @media only screen and (max-width: 575px){
        margin-top: 0;
      }
    }
  }
  .sDash_support-img{
    margin-top: 50px;
    @media only screen and (max-width: 1150px){
      margin-top: 0;
    }
    img{
      width: 100%;
      @media only screen and (max-width: 575px){
        margin-top: 30px;
      }
    }
  }
`;