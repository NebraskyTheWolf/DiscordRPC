/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/05 20:00:48 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 00:14:01 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Client } from "discord-rpc";
import { config } from "../config/config.json"
import ProfileManager from "./profile/ProfileManager";

export default class DiscordRPC extends Client {
    public readonly profileManager: ProfileManager
    public static instance: DiscordRPC

    public constructor() {
        super({ transport: 'ipc' })
        DiscordRPC.instance = this;
        this.profileManager = new ProfileManager()
        this.profileManager.initLoader()

        this.on('ready', () => {
            const data = this.profileManager.getProfile(config.profile)
            if (data.status) {
                this.setActivity({
                    details: data.profile.details,
                    state: data.profile.state,
                    largeImageKey: data.profile.largeImageKey,
                    largeImageText: data.profile.largeImageKey,
                    smallImageKey: 'licence',
                    smallImageText: data.profile.smallImageText,
                    buttons: data.profile.buttons
                }).then(() => {
                    console.log('[+] Presence updated.')
                })
            } else {
                console.log(`[-] Error occurred: ${data.error.message}`)
            }
        })

        this.login({
            clientId: config.clientId
        })
    }
}

export const discordrpc: DiscordRPC = new DiscordRPC()