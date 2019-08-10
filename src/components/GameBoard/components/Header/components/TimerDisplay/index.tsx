import React from 'react';
import moment from 'moment';

type Props = {
  state: 'clear' | 'run' | 'stop'
}

type State = {
  count: number
}

class TimerDisplayComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  private interval: NodeJS.Timeout | undefined = undefined;

  componentWillReceiveProps (newProps: Props) {
    switch (newProps.state) {
      case 'clear': {
        this.interval && clearInterval(this.interval);
        this.interval = undefined;
        this.setState({ count: 0 });
        break;
      }
      case 'run': {
        if (this.props.state === 'run') return;

        this.interval = setInterval(() => {
          this.setState(prevState => ({
            count: prevState.count + 1
          }));
        }, 1000);
        break;
      }
      case 'stop': {
        this.interval && clearInterval(this.interval);
        this.interval = undefined;
        break;
      }
    }
  }

  public render () {
    const { count } = this.state;

    return <div className='timer'>{moment(count * 1000).utc().format('HH:mm:ss')}</div>;
  }
}

export const TimerDisplay = TimerDisplayComponent;