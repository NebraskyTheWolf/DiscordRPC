/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Profile.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/05 20:32:52 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/05 21:46:41 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export declare type IProfile = {
    readonly details: string;
    readonly state: string;
    readonly largeImageKey?: string;
    readonly largeImageText?: string;
    readonly buttons?: Array<{ label: string; url: string }> | undefined;
    readonly smallImageText: string;
}

export default class Profile {
    public readonly profileName: string;
    public readonly details: string;
    public readonly state: string;
    public readonly largeImageKey?: string;
    public readonly largeImageText?: string;
    public readonly buttons?: Array<{ label: string; url: string }>;

    // Licence text DO NOT CHANGE IT.
    public readonly smallImageText: string = "DiscordProfileRPC v1.0.0 by NebraskyTheWolf.";

    public constructor(
        profileName: string,
        details: string,
        state: string,
        largeImageKey?: string,
        largeImageText?: string,
        buttons?: Array<{ label: string; url: string }>) {
        this.profileName = profileName;
        this.details = details;
        this.state = state;
        this.largeImageKey = largeImageKey;
        this.largeImageText = largeImageText;
        this.buttons = buttons;
    }

    public to(): IProfile {
        return {
            details: this.details,
            state: this.state,
            largeImageKey: this.largeImageKey,
            largeImageText: this.largeImageText,
            buttons: this.buttons,
            smallImageText: this.smallImageText
        }
    }
}