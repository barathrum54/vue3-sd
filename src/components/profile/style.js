import Styled from "vue3-styled-components";

export const CardStyleWrapper = Styled.div`
.ant-card{
  background: #F8F9FB;
}
.ant-card-head{
  border-color: #E3E6EF;
  background: #F8F9FB;
}
.ant-card-head .ant-card-extra{
  display: block;
  padding: 12px 0;
  @media only screen and (max-width: 575px){
    margin-bottom: 4px;
  }
}
.ant-card.ant-card-bordered .ant-card-head{
  background: #fff;
}
.ant-card-head-wrapper .ant-card-extra a{
  color: #5F63F2;
}
.ant-card-body{
  padding: 22px 25px 16px 25px !important
}
.ant-card-body p{
  margin-bottom: 4px;
  color: ${({ theme }) => theme['gray-color']};
}
.ant-card.ant-card-bordered {
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #E3E6EF !important;
}
.ant-card-small > .ant-card-head{
  font-size: 16px;
  padding-left: 15px !important;
  padding-right: 15px !important;
  .ant-card-head-title{
    padding: 10.5px 0;
  }
}
.ant-card-small > .ant-card-body{
  padding: 12px 15px 8px 15px !important
}
`;
