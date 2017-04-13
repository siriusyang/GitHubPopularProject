/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    Platform,
    View
} from 'react-native';

export default class ProjectItem extends Component {
    static propTypes: {
        data: PropTypes.object
    }
    static defaultProps: {
        data:"",
    }

    render() {
        return <View>
            <Text style={{height: 20}}>{this.props.data.name}</Text>
        </View>
    }
}