import Styled from 'vue3-styled-components';
import { Table } from 'ant-design-vue';

const NoteNav = Styled.nav`
  ul{
    list-style: none;
    margin: 20px 0;
    padding: 0;
    li{
      position: relative;
      &.add-label-btn{
        &:hover{
          background: transparent;

          a{
            background: transparent;
            color: ${({ theme }) => theme['primary-color']} !important;
          }
        }
        
      }
      a{
        padding: 10px 15px;
        display: flex;
        align-items: center;
        transition: 0.3s ease;
        border-radius: 4px;
        color: ${({ theme }) => theme['gray-color']};
        svg{
          min-width: 18px;
          ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 14px;
          color: ${({ theme }) => theme['extra-light-color']};
        }
        &.active{
          background: rgba(95,99,242,0.1);
          color: ${({ theme }) => theme['primary-color']};
          svg,
          i{
            color: ${({ theme }) => theme['primary-color']};
          }
        }
      }

      &:hover{
        a{
          background: rgba(95,99,242,0.1);
          color: ${({ theme }) => theme['primary-color']};
          svg,
          i{
            color: ${({ theme }) => theme['primary-color']};
          }
        }
      }
    }
  }
  .nav-labels{
    margin-top: 15px;
    p{
      font-size: 12px;
      margin: 0;
    
      text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
      img,
      svg,
      i{
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
      }
    }
    ul{
      margin-top: 6px;
      margin-bottom: 0;
    }
  }
`;

const Bullet = Styled.span`
    min-width: 10px;
    max-width:200px
    height: 10px;
    border-radius: 50%;
    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
  
`;
export {  NoteNav, Bullet };
