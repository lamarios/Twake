import React from 'react';

import Languages from 'services/languages/languages.js';
import ChannelCategory from '../Parts/Channel/ChannelCategory';
import ChannelWorkspaceEditor from 'app/scenes/Client/ChannelsBar/Modals/ChannelWorkspaceEditor';
import ModalManager from 'app/services/Modal/ModalManager';
import ChannelMenu from '../Parts/Channel/ChannelMenu';
import WorkspaceChannelList from 'app/scenes/Client/ChannelsBar/Modals/WorkspaceChannelList';
import ChannelUI from '../Parts/Channel/Channel';
import { ChannelResource, ChannelType } from 'app/models/Channel';
import Menu from 'components/Menus/Menu.js';
import Icon from 'app/components/Icon/Icon';
import { Collection } from 'app/services/CollectionsReact/Collections';

type Props = {
  collection: Collection<ChannelResource>;
  workspaceTitle: string;
  channels: ChannelResource[];
};

export default (props: Props) => {
  const menu = (channel: ChannelType) => {
    return <ChannelMenu channel={channel} />;
  };

  const addChannel = () => {
    return ModalManager.open(
      <ChannelWorkspaceEditor title={'scenes.app.channelsbar.channelsworkspace.create_channel'} />,
      {
        position: 'center',
        size: { width: '600px' },
      },
    );
  };

  const joinChannel = () => {
    return ModalManager.open(<WorkspaceChannelList />, {
      position: 'center',
      size: { width: '500px' },
    });
  };

  let channels;

  if (props.channels.length === 0) {
    channels = (
      <div className="channel_small_text">
        {Languages.t('scenes.app.channelsbar.channelsworkspace.no_channel')}
      </div>
    );
  } else {
    channels = props.channels.map(({ data, key }) => {
      return (
        <ChannelUI
          key={key}
          collection={props.collection}
          name={data.name || ''}
          icon={data.icon || ''}
          muted={data.user_member?.notification_level === 'none'}
          favorite={data.user_member?.favorite || false}
          unreadMessages={false}
          visibility={data.visibility || 'public'}
          notifications={data.messages_count || 0}
          menu={menu(data)}
          id={data.id}
        />
      );
    });
  }
  return (
    <>
      <ChannelCategory
        text={Languages.t(props.workspaceTitle)}
        suffix={
          <Menu
            className="add"
            menu={[
              {
                type: 'menu1',
                text: Languages.t('components.leftbar.channel.workspaceschannels.menu.option_1'),
                onClick: () => addChannel(),
              },
              {
                type: 'menu2',
                text: Languages.t('components.leftbar.channel.workspaceschannels.menu.option_2'),
                onClick: () => joinChannel(),
              },
            ]}
          >
            <Icon type="plus-circle" className="m-icon-small" />
          </Menu>
        }
      />
      {channels}
    </>
  );
};