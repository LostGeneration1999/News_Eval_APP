import React from 'react'
import Input from './components/Input'

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPublished: false,
            order: 1,
            count: 0
        }
    }

    componentDidMount() {
        document.getElementById('counter').addEventListener('click', this.countUp);
    }

    componentDidMount() {
        document.getElementById('counter').addEventListener('click', this.countUp);
    }

    togglePublished = () => {
        this.setState({
            isPublished: !this.state.isPublished
        })
    };

    countUp = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <>
                <Input
                    title={'Hello'}
                    isPublished={this.state.isPublished}
                    isToggle={() => this.togglePublished()}
                    count={this.state.count}
                />
            </>
        );
    }
}

export default Title