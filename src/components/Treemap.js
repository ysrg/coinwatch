import React from 'react';
import PropTypes from 'prop-types'
import { ResponsiveTreeMap } from '../nivo/treemap_src';

const Treemap = ({data}) => {
  return (
     <ResponsiveTreeMap
            root={{
              name: 'coinwatch',
              color: '#fff',
              children: data
            }}
            identity="name"
            value="loc"
            innerPadding={0}
            outerPadding={0}
            label={d => {
              return `${d.name} ${d.prch ? d.prch + '% ' : ''}`}
            }
            labelSkipSize={12}
            labelTextColor="inherit:darker(3.3)"
            colorBy={d => d.color}
            borderWidth={0.5}
            borderColor="inherit:darker(1.3)"
            motionDamping={35}
            motionStiffness={300}
            animate={false}
            tooltip={props => {
              return (
                <p style={{ color: props.data.color }}>
                  {' '}
                  {`${props.data.name} ${
                    props.data.loc ? props.data.loc + 'x' : ''
                  }`}{' '}
                </p>
              );
            }}
            theme={{
              tooltip: { container: { color: '#fff', background: '#333' } }
            }}
          />
  );
};

Treemap.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Treemap;
