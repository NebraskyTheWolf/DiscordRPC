/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileLoader.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/05 23:44:02 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 00:11:24 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import DiscordRPC, { discordrpc } from "..";

import { profiles } from "../../config/profiles.json"
import Profile from "./Profile";

export declare type ProfileButtons = {
    readonly label: string;
    readonly url: string;
}

export declare type JsonProfile = {
    readonly profileName: string;
    readonly details: string;
    readonly state: string;
    readonly largeImageKey?: string;
    readonly largeImageText?: string;
    readonly buttons?: ProfileButtons;
}

export default class ProfileLoader {
    public constructor() {
        if (profiles.length < 1) {
            console.log(`[!] No profile has been detected in the config. Switching to default.`);
        } else {
            profiles.forEach((profile) => {
                console.log(`[?] Validation check for ${profile.profileName}...`)
                let loaded: Profile = new Profile(
                    profile.profileName, profile.details,
                    profile.state, profile.largeImageKey,
                    profile.largeImageText, profile.buttons
                );
                if (this.validation(loaded)) {
                    console.log(`[?] Loading profile ${profile.profileName}.`)
                    DiscordRPC.instance.profileManager.registerProfile(loaded)
                    console.log(`[+] Profile ${profile.profileName} added.`)
                } else {
                    console.error(`[!!!] Loading profile ${profile.profileName} FAILED.`)
                    console.error('[!!!] Please check your `profiles.json` config.')
                }
            })
        }
    }

    private validation(profile: Profile): boolean {
        if (profile.profileName === undefined)
            return false;
        if (profile.details === undefined)
            return false;
        if (profile.state === undefined)
            return false;
        if (profile.largeImageKey === undefined)
            return false;
        return true;
    }
}