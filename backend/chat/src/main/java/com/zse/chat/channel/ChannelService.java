package com.zse.chat.channel;

import com.zse.chat.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChannelService {

  private final ChannelRepository channelRepository;

  public List<Channel> getChannels(User user) {
    return channelRepository.getChannelsByOwnersInOrMembersIn(List.of(user), List.of(user));
  }

  public Channel getChannelByIdForUser(User user, int id) {
    return channelRepository.getChannelsByOwnersInOrMembersIn(List.of(user), List.of(user))
        .stream()
        .filter(channel -> channel.getId() == id)
        .findFirst()
        .orElseThrow(() -> new ChannelNotFoundException(id));
  }

  public Channel getChannelById(int id) {
    return channelRepository.findById(id).orElseThrow(() -> new ChannelNotFoundException(id));
  }

  public Channel saveChannel(User user) {
    final var channel = Channel.builder()
        .owners(Set.of(user))
        .members(Set.of())
        .directMessage(false)
        .build();
    return channelRepository.save(channel);
  }

  public Channel saveChannel(User user, Boolean directMessage) {
    if (directMessage == null) {
      return saveChannel(user);
    }
    final var channel = Channel.builder()
        .owners(Set.of(user))
        .members(Set.of())
        .directMessage(directMessage)
        .build();
    return channelRepository.save(channel);
  }

  public boolean userHasPermissionToUpdateChannel(Channel channel, String nickname) {
    return channel.getOwners()
        .stream().anyMatch(owner -> owner.getNickname().equals(nickname));
  }

  public Channel updateChannel(Channel channel, ChannelUpdateAction action, User manipulateUser) {
    final var owners = channel.getOwners();
    final var members = channel.getMembers();

    switch (action) {
      case ADD_OWNER -> {
        owners.add(manipulateUser);
        members.remove(manipulateUser);
      }
      case REMOVE_OWNER -> {
        owners.remove(manipulateUser);
        members.add(manipulateUser);
      }
      case ADD_MEMBER -> {
        if (owners.contains(manipulateUser)) {
          return channel;
        }
        members.add(manipulateUser);
      }
      case REMOVE_MEMBER -> members.remove(manipulateUser);
    }

    final var updatedChannel = Channel.builder()
        .id(channel.getId())
        .owners(owners)
        .members(members)
        .directMessage(channel.getDirectMessage())
        .build();

    return channelRepository.save(updatedChannel);
  }

  public boolean userHasPermissionToSeeChannel(Channel channel, String nickname) {
    final var resultOwner = channel.getOwners()
        .stream()
        .filter(owner -> owner.getNickname().equals(nickname))
        .findFirst();

    final var resultMember = channel.getMembers()
        .stream()
        .filter(member -> member.getNickname().equals(nickname))
        .findFirst();

    return resultOwner.isPresent() || resultMember.isPresent();
  }

}
