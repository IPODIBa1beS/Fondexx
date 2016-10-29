<div>
    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="register">
            <h2>Открыть счет</h2>
            <?php
                $register_block = module_invoke('webform', 'block_view', 'client-block-177');
                print render($register_block['content']);
            ?>
        </div>
        <div role="tabpanel" class="tab-pane" id="login">
            <h2>Вход</h2>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
                </div>
                <div class="checkbox">
                    <a href="#">Забыли пароль?</a>
                </div>
                <button type="submit" class="btn btn-default">Вход</button>
            </form>
        </div>
    </div>

</div>
