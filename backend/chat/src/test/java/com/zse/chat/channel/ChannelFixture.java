package com.zse.chat.channel;

import com.zse.chat.message.Message;
import com.zse.chat.user.User;

import java.util.List;
import java.util.Set;

public class ChannelFixture {

    public static Channel.ChannelBuilder createDefaultChannel(
            int number,
            Set<User> owners,
            Set<User> members,
            List<Message> messages
    ) {
        return Channel.builder()
                .id(number)
                .owners(owners)
                .members(members)
                .messages(messages)
                .directMessage(false);
    }
}
