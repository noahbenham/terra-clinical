import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import AppDelegate from 'terra-app-delegate';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import ItemView from 'terra-clinical-item-view';
import Header from 'terra-clinical-header';
import ContentContainer from 'terra-content-container';
import IconScratchPad from 'terra-icon/lib/icon/IconScratchPad'
import IconEnvelope from 'terra-icon/lib/icon/IconEnvelope';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconEdit from 'terra-icon/lib/icon/IconEdit';

import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';
import styles from './MessageCenter.scss';

const cx = classNames.bind(styles);

const propTypes = {
  app: AppDelegate.propType,
  routingManager: RoutingManagerDelegate.propType,
};

class MessageCenter extends React.Component {
  render() {
    const { app, routingManager } = this.props;

    const messageClasses = cx([
      'message-center',
      { 'is-compact': routingManager.size === 'tiny'},
    ]);

    return (
      <div className={messageClasses}>
        <div className={cx('panel-section')}>
          <br />
          <span className={cx('message-title')}>INBOX ITEMS</span>
          <SingleSelectList className={cx('message-list')} isDivided key="first" hasChevrons>
            <SingleSelectList.Item content={<ItemView startAccessory={<IconScratchPad />} layout="twoColumns" textEmphasis="start" displays={[<ItemView.Display text="Message" key="125" />, <ItemView.Display text="4/4" key="125" />]} />} key="120" />
            <SingleSelectList.Item content={<ItemView startAccessory={<IconScratchPad />} displays={[<ItemView.Display text="Reminders" key="126" />]} />} key="121" />
            <SingleSelectList.Item content={<ItemView startAccessory={<IconScratchPad />} displays={[<ItemView.Display text="Consults" key="126" />]} />} key="122" />
          </SingleSelectList>
          <br />
          <SingleSelectList className={cx('message-list')} isDivided key="second" hasChevrons>
            <SingleSelectList.Item content={<ItemView startAccessory={<IconScratchPad />} layout="twoColumns" textEmphasis="start" displays={[<ItemView.Display text="Cosign Orders" key="126" />, <ItemView.Display text="1" key="125" />]} />} key="120" />
          </SingleSelectList>
          <br />
          <SingleSelectList className={cx('message-list')} isDivided key="third" hasChevrons>
            <SingleSelectList.Item content={<ItemView startAccessory={<IconEnvelope />} displays={[<ItemView.Display text="Receipts" key="126" />]} />} key="120" />
            <SingleSelectList.Item content={<ItemView startAccessory={<IconReply />} displays={[<ItemView.Display text="Sent" key="126" />]} />} key="121" />
            <SingleSelectList.Item content={<ItemView startAccessory={<IconTrash />} displays={[<ItemView.Display text="Trash" key="126" />]} />} key="122" />
          </SingleSelectList>
        </div>
        <ContentContainer className={cx('content-section')} fill header={<Header style={{ height: '39px', backgroundColor: '#DEDFE0' }} endContent={<IconEdit />} />}>
          <div style={{ padding: '10px' }}>
            <p>From: JoJo, Joey</p>
            <p>To: Johnson, John</p>
            <hr />
            <h3>Physician Office/Clinic Message</h3>
            <p>Sep 28, 2:35 PM</p>
            <hr />
            <p>Attachements(1)</p>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a arcu elit. Nam erat elit, mollis ut pulvinar at, iaculis quis felis. Mauris sollicitudin purus vitae quam hendrerit lacinia non luctus mi. Nunc sagittis mauris at odio volutpat posuere. Nulla massa ligula, porttitor nec rutrum in, auctor quis metus. Praesent sed turpis et magna sodales efficitur ut nec ante. Praesent placerat urna eget turpis porttitor rhoncus. Integer a iaculis odio. Praesent luctus malesuada nisl ac egestas. Vestibulum ultrices scelerisque ante nec hendrerit. Nulla eget porta diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi viverra convallis erat at pulvinar. Donec condimentum, risus ut fringilla varius, odio nisl cursus nulla, vitae mattis urna quam id urna.
            </p>
            <br />
            <p>
              Vestibulum et metus vulputate, tincidunt nulla quis, fermentum velit. Sed rutrum sit amet nibh id porta. Nullam congue magna est, quis varius nisi sagittis in. Fusce rhoncus nunc eu imperdiet convallis. Donec interdum egestas consectetur. Sed pretium tristique tristique. Nulla elementum luctus nunc, vel ultrices nisi dictum id. Duis congue commodo dui, in pretium leo ultrices eget. Duis pulvinar odio justo, eget lobortis erat malesuada sed. Vestibulum feugiat tellus ac eros varius pretium. Fusce ac purus justo.
            </p>
            <br />
            <p>
              Praesent id convallis nisl, at efficitur ex. Mauris nec ex eros. Etiam non lacus blandit, pellentesque quam eget, tincidunt elit. Etiam vehicula at enim scelerisque vulputate. Suspendisse eu lacus malesuada, semper dui ac, rutrum mauris. In urna mauris, congue eu maximus et, posuere id augue. Phasellus placerat dui eu nibh rhoncus, et mattis leo tristique. Nam ante sem, sollicitudin in facilisis a, bibendum nec ante. Sed sem dui, convallis molestie cursus vitae, lobortis eget sapien. Vivamus viverra eleifend sagittis. Nulla quis nunc augue. Aenean dignissim mi non hendrerit fringilla. Morbi suscipit faucibus commodo. Sed nec sollicitudin orci, id maximus enim. Ut a ante sit amet urna viverra finibus.
            </p>
          </div>
        </ContentContainer>
      </div>
    );
  }
}

MessageCenter.propTypes = propTypes;

export default MessageCenter;
