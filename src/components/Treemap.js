import React from 'react';
import { ResponsiveTreeMap } from '../nivo/treemap_src';

const Treemap = ({data}) => {
  return (
     <ResponsiveTreeMap
            root={{
              name: 'crypto-signal',
              color: '#f3f9ef',
              children: data
            }}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={4}
            label={d => {
              return `${d.name} ${d.prch ? d.prch + '% ' : ''}`}
            }
            labelSkipSize={8}
            labelTextColor="inherit:darker(2.8)"
            colorBy={d => d.color}
            borderWidth={1}
            borderColor="inherit:darker(2.3)"
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

export default Treemap;
