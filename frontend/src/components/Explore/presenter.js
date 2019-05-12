import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Loading from "components/Loading";
import UserRow from "components/UserRow";

const Explore = (props) => {
    if (props.loading) {
        return <LoadingExplore/>;
    } else if (props.userList) {
        return <RenderExplore {...props}/>;
    }
};

const LoadingExplore = () => (
    <div className={styles.explore}>
        <Loading/>
    </div>
);

const RenderExplore = ({userList}) => (
    <div className={styles.explore}>
        {userList.map(user => <UserRow big={true} user={user} key={user.id}/>)}
    </div>
);

Explore.propTypes = {
    loading: PropTypes.bool.isRequired,
    userList: PropTypes.array,
};

export default Explore;
