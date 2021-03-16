import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get(url)
        .then(response => {
            this.setState({exercises: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    
}