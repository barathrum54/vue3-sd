import Styled from 'vue3-styled-components';

export const TimeLinePointerIconWrap = Styled.div`
  padding: 4% ;
  .ant-timeline-item-last > .ant-timeline-item-tail{
    display: block;
  }
  .ant-timeline-item-tail{
    border-width: 3px;
  }
  .ant-timeline-item{
    padding-bottom: 28px;
    &:last-child{
      padding-bottom: 0;
    }
    &.timeline-primary{
      .ant-timeline-item-head{
        background-color: #E7E8FD;
      }
    }
    &.timeline-info{
      .ant-timeline-item-head{
        background-color: #DFF0FF;
      }
    }
    &.timeline-warning{
      .ant-timeline-item-head{
        background-color: #FFEEDA;
      }
    }
    &.timeline-pink{
      .ant-timeline-item-head{
        background-color: #FFE8F2;
      }
    }
    &.timeline-success{
      .ant-timeline-item-head{
        background-color: #DDF7F0;
      }
    }
    &.timeline-danger{
      .ant-timeline-item-head{
        background-color: #FFE4E5;
      }
    }
    .ant-timeline-item-head{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      &:after,
      &:before{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -8px;
        width: 8px;
        height: 8px;
        content: "";
        background-color: #fff;
      }
      &:before{
        top: auto;
        bottom: -8px;
      }
    }
    .ant-timeline-item-content{
      margin: ${({ theme }) => (theme.rtl ? '-38px 42px 0 0' : '-38px 0 0 42px')};
      h3{
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 30px;
        color: ${({ theme }) => theme['dark-color']};
      }
      p{
        font-size: 14px;
        font-weight: 400;
        max-width: 330px;
        margin-bottom: 12px;
      }
      .tags{
        font-size: 14px;
        color: ${({ theme }) => theme['light-gray-color']};
      }
    }
  }
`;

