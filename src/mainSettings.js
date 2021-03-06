import create from 'zustand';

export const initState = {
  channels: [
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
  ],
  lastSelected: 1,
  dev: 0,
};

export const [useMainSettings, settingsApi] = create(set => ({
  ...initState,
}));

export function updateChannelSel(channel) {
  if (getSelectedCount() < 3) {
    settingsApi.setState(prevState => {
      const channels = prevState.channels.map((ch, j) => {
        if (j === channel - 1) {
          var newChannel = ch;
          newChannel.selected = !prevState.channels[j].selected;
          return newChannel;
        } else {
          return ch;
        }
      });
      return {
        channels,
      };
    });
  }
}

export function updateLastSel(channel) {
  settingsApi.setState(prevState => ({
    ...prevState,
    lastSelected: channel,
  }));
}

function getSelectedCount() {
  const x = settingsApi.getState().channels.filter(channel => channel.selected === true);
  return x.length
}

