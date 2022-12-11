import Styled from "vue3-styled-components";

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