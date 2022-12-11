import Styled from 'vue3-styled-components';

const Content = Styled.div`
    background: #ffffff;
    box-shadow: 0px 0px 2px #888;
    a i, a svg, a img {
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
    }
    a {
        display: flex;
        color: #888;
        padding: 6px 12px;
        span{
            margin-left: 15px;
        }
    }
    a:hover {
        background: ${({ theme }) => theme['primary-color']}10;
        color: ${({ theme }) => theme['primary-color']}
    }
    
    .dropdown-theme-2{
        a:hover{
            background: ${({ theme }) => theme.pink}10;
            color: ${({ theme }) => theme.pink}
        }
    }
`;

export { Content };
