import Styled from 'vue3-styled-components';

const Footer = Styled.div`
  padding: 0 25px;
  .chatbox-reply-form{
    position: relative;
    align-items: center;
    .smile-icon{
      position: relative;
      position: absolute;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 25px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      z-index: 9999;
      @media only screen and (max-width: 575px){
        top: 26px;
      }
      emoji-picker{
          position: absolute;
          z-index: 999999999;
          bottom: 0;
          @media only screen and (max-width: 991px){
            right: auto;
            left: 100%;
          }
          @media only screen and (max-width: 479px){
            right: auto;
            left: -35px;
          }
          .emoji-search{
            padding: 8px;
            height: auto;
            border-radius: 5px;
          }
      }
      .ant-dropdown-trigger{
        display: flex;
        align-items: center;
      }
      a{
        display: flex;
      }
      svg,
      i{
        color: ${({ theme }) => theme['extra-light-color']};
      }
    }
    &.hasFile{
      .ant-upload-list{
        &.ant-upload-list-text{
          padding: 15px;
        }
      }
    }
    .ant-upload-list{
      display: flex;
      position: absolute;
      top: -70px;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
    }
    .chatbox-reply-input{
      width: 100%;
      ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
      input{
        padding: ${({ theme }) => (theme.rtl ? '0 70px 0 25px' : '0 25px 0 70px')};
        height: 50px;
        border: 0 none;
        border-radius: 35px;
        background: ${({ theme }) => theme['bg-color-normal']};
        &::placeholder{
          font-size: 14px;
          color: ${({ theme }) => theme['light-color']};
        }
        &:focus{
          border: 0 none;
          outline: none;
        }
      }
    }
    input,
    span{
      ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
    }
    .chatbox-reply-action{
      display:flex;
      align-items: center;
      justify-content: center;
      a{
        span{
          display: block;
        }
      }
      .btn-send{
        box-shadow: 0 8px 13px #5F63F220;
      }
      .ant-upload-select,
      button{
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        span{
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
          color: #fff;
        }
      }
      .ant-upload-select {
        background: ${({ theme }) => theme['bg-color-normal']};
        .ant-upload{
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
          svg{
            margin-top: 8px;
            color: ${({ theme }) => theme['light-color']};
          }
        }
      }
      button{
        padding: 0;
        background: ${({ theme }) => theme['primary-color']};
      }
    }

    .ant-upload-select-picture-card{
      margin: 0;
      width: 50px;
      border-radius: 50% !important;
      border: 0 none;
      background-color: ${({ theme }) => theme['bg-color-normal']} !important;
      svg,
      i{
        margin-top: 7px !important;
      }
    }
    .ant-upload-list{
      &.ant-upload-list-text{
        display: block;
        top: auto;
        bottom: 136px;
        background: #fff;
        padding: 0;
        border-radius: 5px;
        box-shadow: 0 5px 20px #9299B803;
        >div{
          display: block;
        }
        .ant-upload-list-item{
          height: 24px;
          border-radius: 4px;
          background-color: ${({ theme }) => theme['bg-color-normal']};
          button{
            width: auto;
            height: auto;
            min-width: auto;
            background-color: ${({ theme }) => theme['bg-color-normal']};
            svg{
              color: ${({ theme }) => theme['info-color']};
            }
          }
        }
        .ant-upload-list-item-info{
          >span{
            display: flex;
            align-items: center;
          }
          .ant-upload-list-item-name {
            font-size: 13px;
          }
          .anticon,
          .ant-upload-list-item-name {
            color: ${({ theme }) => theme['info-color']};
          }
        }
      }
      &.ant-upload-list-picture-card{
        .ant-upload-list-picture-card-container{
          width: 60px;
          height: 50px;
        }
        .ant-upload-list-item{
          width: 60px;
          height: 50px;
          padding: 3px;
          .ant-upload-list-item-actions{
            .anticon-eye{
              display: none;
            }
            .anticon{
              margin: 0;
            }
          }
          .ant-upload-list-item-card-actions-btn{
            width: 25px;
            height: 25px;
            min-width: 25px;
          }
          .ant-upload-list-item-thumbnail{
            font-size: 11px;
          }
          .ant-upload-list-item-name{
            display: none;
          }
        }
      }
    }
  }
`;


const BackShadowEmoji = Styled.div`
    width: 100%;
    height: 100%;
    background: #11121760;
    position: fixed;
    top: 0;
    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
    z-index: 9999;
`;

export {  Footer,BackShadowEmoji };
